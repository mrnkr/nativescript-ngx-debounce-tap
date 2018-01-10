import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { animate } from '@angular/animations';

import { shadeBlendConvert } from '../shades';

@Component({
  moduleId: module.id,
  selector: 'app-number-picker',
  templateUrl: './number-picker.component.xml',
  styleUrls: ['./number-picker.component.css']
})
export class NumberPickerComponent {
  @Input() color: string; // The main color for the component, the value will be shown in a darker shade
  @Input() max: number;
  @Input() min: number;
  @Input() mask: string[]; // Instead of showing the vurrent value, the component will show the element in mask[value]
  @Input() altIcon: boolean; // Will change the icons shown
  @Output() valueChanged = new EventEmitter<any>();

  @ViewChild('display') display: ElementRef;

  private value: number;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.value = this.min;
    this.valueChanged.emit(this.value);
  }

  private darkenColor(color: string): string {
    return shadeBlendConvert(color, -20);
  }

  private get next(): number {
    return this.value + 1 < this.max ? this.value + 1 : this.value;
  }

  private get previous(): number {
    return this.value - 1 >= this.min ? this.value - 1 : this.value;
  }

  private set newValue(value: number) {
    this.value = value;
    this.valueChanged.emit(this.mask ? this.mask[this.value] : this.value);
  }

  private onNextTap(event: any): void {
    this.animateButtonInteraction(event.nativeElement);

    this.display.nativeElement.animate({
      opacity: 0,
      translate: { x: -10, y: 0 },
      duration: 150
    }).then(() => {
      if (this.value !== this.next) {
        this.newValue = this.next;
        this.changeDetectorRef.detectChanges();

        this.display.nativeElement.animate({
          translate: { x: 10, y: 0 },
          duration: 1
        }).then(() => {
          this.display.nativeElement.animate({
            opacity: 1,
            translate: { x: 0, y: 0 },
            duration: 150
          });
        });
      } else {
        this.display.nativeElement.animate({
          opacity: 1,
          translate: { x: 0, y: 0 },
          duration: 150
        });
      }
    });
  }

  private onPreviousTap(event: any): void {
    this.animateButtonInteraction(event.nativeElement);

    this.display.nativeElement.animate({
      opacity: 0,
      translate: { x: 10, y: 0 },
      duration: 150
    }).then(() => {
      if (this.value !== this.previous) {
        this.newValue = this.previous;
        this.changeDetectorRef.detectChanges();

        this.display.nativeElement.animate({
          translate: { x: -10, y: 0 },
          duration: 1
        }).then(() => {
          this.display.nativeElement.animate({
            opacity: 1,
            translate: { x: 0, y: 0 },
            duration: 150
          });
        });
      } else {
        this.display.nativeElement.animate({
          opacity: 1,
          translate: { x: 0, y: 0 },
          duration: 150
        });
      }
    });
  }

  private animateButtonInteraction(btn: any): void {
    btn.animate({
      scale: { x: 1.2, y: 1.2 },
      duration: 150
    }).then(() => {
      btn.animate({
        scale: { x: 1, y: 1 },
        duration: 150
      });
    });
  }
}
