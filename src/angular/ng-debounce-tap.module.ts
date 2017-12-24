import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { DebounceTapDirective } from './ng-debounce-tap.directive';

@NgModule({
    imports: [
      NativeScriptModule
    ],
    declarations: [
      DebounceTapDirective
    ],
    exports: [
      DebounceTapDirective
    ]
})
export class NgDebounceTapModule { }