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
  @Input() anim: string; // possible values are scale, opacity or composite
  @Input() scale: number;
  @Input() opacity: number;
  @Output() debounceTap = new EventEmitter<ElementRef>();

  private subscription: Subscription;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const tapEvent$ = Observable.fromEvent(this.el.nativeElement, 'tap');
    const throttledTap$ = tapEvent$.throttle(args => Observable.interval(this.delay | 300));

    this.subscription = throttledTap$.subscribe(args => {
      if (this.anim) {
        this.animateInteraction(this.el.nativeElement)
            .then(() => this.debounceTap.emit(this.el));
      } else {
        this.debounceTap.emit(this.el);
      }
    });
  }

  /**
   * All animations consist of a quick transformation and then returning the element to its previous state
   * @param elem The component that triggered the event
   * @return A promise which will have its then function trigger after the animation
   */
  private animateInteraction(elem: any): Promise<void> {
    // Transform the element as the directive is told to
    return elem.animate({
      scale: this.anim === 'composite' || this.anim === 'scale' ? { x: this.scale || 1.2, y: this.scale || 1.2 } : { x: 1, y: 1 },
      opacity: this.anim === 'composite' || this.anim === 'opacity' ? ( this.opacity || 0.6 ) : 1,
      duration: 150
    }).then(() => elem.animate({
        scale: { x: 1, y: 1 },
        opacity: 1,
        duration: 150
      }));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
