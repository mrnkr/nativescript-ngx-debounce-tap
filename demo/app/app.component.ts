import { Component, ChangeDetectorRef } from "@angular/core";
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';

import { SwipeGestureEventData, SwipeDirection } from "ui/gestures";

import { TNSFancyAlert } from 'nativescript-fancyalert';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import * as SocialShare from 'nativescript-social-share';

@Component({
	selector: "ns-app",
	templateUrl: "app.component.xml",
	animations: [
		trigger('fadeInOut', [
			transition('void => previous', [
				style({
					opacity: 0,
					transform: 'translateX(-100%)'
				}),
				animate('0.3s ease-in', style({
					opacity: 1,
					transform: 'translateX(0)'
				}))
			]),
			transition('previous => void', [
				style({
					opacity: 1,
					transform: 'translateX(0)'
				}),
				animate('0.3s 0.1s ease-out', style({
					opacity: 0,
					transform: 'translateX(100%)'
				}))
			]),
			transition('void => next', [
				style({
					opacity: 0,
					transform: 'translateX(100%)'
				}),
				animate('0.3s ease-in', style({
					opacity: 1,
					transform: 'translateX(0)'
				}))
			]),
			transition('next => void', [
				style({
					opacity: 1,
					transform: 'translateX(0)'
				}),
				animate('0.3s 0.1s ease-out', style({
					opacity: 0,
					transform: 'translateX(-100%)'
				}))
			])
		])
	]
})
export class AppComponent {
	private page = 'delay';
	private orientation: string;
	private props = {
		delay: 0,
		anim: 'opacity',
		scale: 0,
		opacity: 0
	};

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private fonticon: TNSFontIconService
	) {}

	private showInfo(): void {
		TNSFancyAlert.showInfo('Well, hello there!', 
													 'Not much to say, just got bored and made this simple but really useful plugin... Hope you like it!', 
													 'Thanks!');
	}

	private share(): void {
		SocialShare.shareUrl('https://github.com/mrnkr', 'Check out this and my other repos!');
	}

	private hello(): void {
		console.log('Tap processed');
	}

	private setValue(prop: string, val: number | string) {
		for (let key in this.props) {
			if (this.props.hasOwnProperty(key) && key === prop) {
				this.props[key] = val;
				this.changeDetectorRef.detectChanges();
			}
		}
	}
	
	private onSwipe(args: SwipeGestureEventData): void {
		if (args.direction === SwipeDirection.left) {
			this.page = this.nextPage;
			this.orientation = 'next';
		}

		if (args.direction === SwipeDirection.right) {
			this.page = this.previousPage;
			this.orientation = 'previous';
		}

		this.changeDetectorRef.detectChanges();
	}

	private get nextPage(): string {
		return this.page === 'delay' ? 'anim' : this.page === 'anim' ? 'scale' : this.page === 'scale' ? 'opacity' : 'delay';
	}

	private get previousPage(): string {
		return this.page === 'opacity' ? 'scale' : this.page === 'scale' ? 'anim' : this.page === 'anim' ? 'delay' : 'opacity';
	}
}
