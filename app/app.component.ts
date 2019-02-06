import {Component} from '@angular/core';
import {HouseHomeComponent} from "./HouseHome";
import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template: `
    <cinema-window></cinema-window>
    <book-show></book-show>
    `,
    directives: [HouseHomeComponent]
})

export class AppComponent {
}