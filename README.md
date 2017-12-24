# nativescript-ngx-debounce-tap

{N} + Angular directive for debouncing taps and adding animated feedback to the interaction.

## Installation

Describe your plugin installation steps. Ideally it would be something like:

```
tns plugin add nativescript-ngx-debounce-tap
```

## Usage 

### Import the module in your app module

    ```typescript
        import { NgDebounceTapModule } from 'nativescript-ngx-debounce-tap';

        @NgModule({
            imports: [
                NgDebounceTapModule,
                // ...
            ],
            // ...
        })
        export class MyModule { }
    ```

### Then use it in your templates like so

    ```xml
        <Label text="Hello World!" ngDebounceTap [delay]="300" [anim]="true" [scale]="1.06" (debounceTap)="hello()"></Label>
    ```

## API
    
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| delay | number | 300 | The time between each processed tap in milliseconds. |
| anim | boolean | false | Whether the interaction should be animated. Such animation is a scale animation which makes the element bigger and then shrinks it back to its original size. |
| scale | number | 1.2 | The scale to use when magnifying the element. Set this in order to keep the animation as seamless as possible. |
| debounceTap | EventEmitter<ElementRef> | none | The event that is emitted when a tap is processed. The $event variable will have a reference to the element that was tapped (as an ElementRef). In case the scale animation is not your thing you can set [anim] to false and make one that suits you in this callback yourself. |

## License

Apache License Version 2.0, January 2004
