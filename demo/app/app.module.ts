import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NSModuleFactoryLoader } from "nativescript-angular/router";

import { AppComponent } from "./app.component";

import { NgDebounceTapModule } from 'nativescript-ngx-debounce-tap';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NgDebounceTapModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
