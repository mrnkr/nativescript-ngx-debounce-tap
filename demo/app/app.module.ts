import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptAnimationsModule } from "nativescript-angular/animations";
import { NSModuleFactoryLoader } from "nativescript-angular/router";

import { AppComponent } from "./app.component";
import { NumberPickerComponent } from './number-picker.component/number-picker.component';

import { NgiPhoneXSafeAreaModule } from 'nativescript-ngx-iphonex-safe-area';
import { NgDebounceTapModule } from 'nativescript-ngx-debounce-tap';
import { NgShadowModule } from 'nativescript-ng-shadow';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		NativeScriptModule,
		NativeScriptAnimationsModule,
		NgiPhoneXSafeAreaModule,
		NgDebounceTapModule,
		NgShadowModule,
		TNSFontIconModule.forRoot({
			'ion': './assets/ionicons.css'
		})
	],
	declarations: [
		AppComponent,
		NumberPickerComponent
	],
	providers: [{
		provide: NgModuleFactoryLoader,
		useClass: NSModuleFactoryLoader
	}],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
export class AppModule { }
