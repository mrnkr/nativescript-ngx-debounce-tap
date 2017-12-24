import { Directive, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { animate } from '@angular/animations';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/throttle';

@Directive({
  selector: '[ngDebounceTap]'
})
export class DebounceTapDirective implements OnInit, OnDestroy {
  @Input() delay: number;
  @Input() anim: boolean;
  @Input() scale: number;
  @Output() debounceTap = new EventEmitter<ElementRef>();

  private subscription: Subscription;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const tapEvent$ = Observable.fromEvent(this.el.nativeElement, 'tap');
    const throttledTap$ = tapEvent$.throttle(args => Observable.interval(this.delay | 300));

    this.subscription = throttledTap$.subscribe(args => {
      if (this.anim) {
        this.animateInteraction(this.el.nativeElement, () => {
          this.debounceTap.emit(this.el);
        });
      } else {
        this.debounceTap.emit(this.el);
      }
    });
  }

  private animateInteraction(elem: any, callback: () => void): void {
    elem.animate({
      scale: { x: this.scale || 1.2, y: this.scale || 1.2 },
      duration: 150
    }).then(() => {
      elem.animate({
        scale: { x: 1, y: 1 },
        duration: 150
      }).then(() => {
        callback();
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
