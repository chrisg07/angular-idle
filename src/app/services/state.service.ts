import { Injectable } from '@angular/core';
import {Tile} from "../domain/tile";
import {State} from "../domain/state";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private map: Tile[][] = new Array<Array<Tile>>();
  public surroundingCells !:  Tile[][];
  public resources = 0;
  public state = new Subject<State>()
  private x: number;
  private y: number;

  constructor() {
    this.x = 50;
    this.y = 50;
    this.map = this.generateMap(100, 100);
    this.surroundingCells = this.getSurroundingCells(this.x, this.y);
  }

  private generateMap(height: number, width: number): Tile[][] {
    let map = new Array<Array<Tile>>();

    for (let x = 0; x < width; x++) {
      map[x] = new Array<Tile>();
      for (let y = 0; y < height; y++) {
        map[x][y] = new Tile(x, y);
      }
    }
    return map;
  }

  public getSurroundingCells(x: number, y: number): Tile[][] {
    const surroundingTiles: Tile[][] = [
      [this.map[x - 1][y + 1], this.map[x][y + 1], this.map[x + 1][y + 1]],
      [this.map[x - 1][y], this.map[x][y], this.map[x + 1][y]],
      [this.map[x - 1][y - 1], this.map[x][y - 1], this.map[x + 1][y - 1]]
    ];
    return surroundingTiles;
  }

  public move(xDelta: number, yDelta: number): void {
    this.x += xDelta;
    this.y += yDelta;
    this.resources += this.map[this.x][this.y].resources;
    this.surroundingCells = this.getSurroundingCells(this.x, this.y);
    this.state.next(new State(this.surroundingCells, this.resources));
  }

  public addResources(delta: number): void {
    this.resources += delta;
  }
}
