import { Component } from '@angular/core';
import {fromEvent, Observable, Subscription} from "rxjs";
import {StateService} from "./services/state.service";
import {State} from "./domain/state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-idle';

  subscription !: Subscription;
  public totalResources: number;
  constructor(private state: StateService) {
    this.totalResources = this.state.resources;
  }
  ngOnInit() {
    this.subscription = fromEvent(document, 'keydown').subscribe((e) => {
      let event: KeyboardEvent = e as KeyboardEvent;

      switch (event.keyCode) {
        case 65:
        case 37:
          this.state.move(-1, 0);
          break;
        case 87:
        case 38:
          this.state.move(0, 1);
          break;
        case 68:
        case 39:
          this.state.move(1, 0);
          break;
        case 83:
        case 40:
          this.state.move(0, -1);
          break;
      }
    })

    this.state.state.subscribe((state: State) => {
      this.totalResources = state.resources;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
