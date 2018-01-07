import { OnInit, OnDestroy, EventEmitter, ElementRef } from '@angular/core';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/throttle';
export declare class DebounceTapDirective implements OnInit, OnDestroy {
    private el;
    delay: number;
    anim: string;
    scale: number;
    debounceTap: EventEmitter<ElementRef>;
    private subscription;
    constructor(el: ElementRef);
    ngOnInit(): void;
    private animateInteraction(elem, callback);
    ngOnDestroy(): void;
}
