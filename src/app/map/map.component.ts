import {AfterViewInit, Component} from '@angular/core';
import {Tile} from "../domain/tile";
import {StateService} from "../services/state.service";
import {State} from "../domain/state";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  public tiles !: Tile[][];

  constructor(private state: StateService) {
    this.tiles = this.state.surroundingCells;

    this.state.state.subscribe((state: State) => {
      this.tiles = state.surroundingTiles;
    });

    console.log(this.tiles)
  }

  ngAfterViewInit(): void {
    this.state.setWidth(15);
  }

  public decreaseZoom(): void {
    this.state.decreaseWidth();
  }

  public increaseZoom(): void {
    this.state.increaseWidth();
  }
}
