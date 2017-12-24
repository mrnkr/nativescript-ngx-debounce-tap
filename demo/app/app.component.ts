import { Component } from "@angular/core";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.xml"
})
export class AppComponent { 
    private hello(): void {
        console.log('Hello World!');
    }
}
