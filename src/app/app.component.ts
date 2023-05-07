import { Component } from '@angular/core';
import {fromEvent, Observable, Subscription} from "rxjs";
import {StateService} from "./services/state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-idle';

  subscription !: Subscription;

  constructor(private state: StateService) {
  }
  ngOnInit() {
    this.subscription = fromEvent(document, 'keydown').subscribe((e) => {
      let event: KeyboardEvent = e as KeyboardEvent;
      console.log(event);

      switch (event.keyCode) {
        case 65:
        case 37:
          console.log('go west');
          this.state.move(-1, 0);
          break;
        case 87:
        case 38:
          console.log('go north');
          this.state.move(0, 1);
          break;
        case 68:
        case 39:
          console.log('go east');
          this.state.move(1, 0);
          break;
        case 83:
        case 40:
          console.log('go south');
          this.state.move(0, -1);
          break;
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
