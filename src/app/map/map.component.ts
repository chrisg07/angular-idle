import { Component } from '@angular/core';
import {Tile} from "../domain/tile";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  public tiles: Tile[] = new Array<Tile>();

  constructor() {
    for (let i = 0; i < 9; i++) {
      this.tiles.push(new Tile());
    }

    console.log(this.tiles)
  }
}
