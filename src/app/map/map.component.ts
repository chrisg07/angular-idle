import { Component } from '@angular/core';
import {Tile} from "../domain/tile";
import {StateService} from "../services/state.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  public tiles !: Tile[][];

  constructor(private state: StateService) {
    this.tiles = this.state.surroundingCells;

    console.log(this.tiles)
  }
}
