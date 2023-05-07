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
  private mapWidth = 15;

  constructor() {
    this.x = 50;
    this.y = 50;
    this.map = this.generateMap(100, 100);
    this.surroundingCells = this.getSurroundingCells(this.mapWidth);
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

  public getSurroundingCells(width: number): Tile[][] {
    // width must be odd
    if (width % 2 === 0) {
      width++;
    }

    // determine left starting index
    let delta = Math.floor(width / 2);
    console.log('delta', delta)
    let left = this.x - delta;
    let right = this.x + delta;
    let bottom = this.y - delta;
    let top = this.y + delta;
    let tiles = new Array<Array<Tile>>();
    for (let yMin = bottom; yMin <= top; yMin++) {

      console.log('bottom:', bottom)
      console.log('top:', top)
      let row = new Array<Tile>();
      for (let xMin = left; xMin <= right; xMin++) {
        console.log('adding:', left, bottom)
        row.push(this.map[xMin][yMin]);
      }
      tiles.push([...row]);
    }

    return tiles;
  }

  public setWidth(width?: number): void {
    this.mapWidth = width ?? this.mapWidth;
    this.move(0, 0);

    const cellGrid = document.getElementById('cell-grid');
    if (cellGrid) {
      cellGrid.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    }
  }

  public increaseWidth(): void {
    this.setWidth(this.mapWidth + 2);
  }

  public decreaseWidth(): void {
    this.setWidth(this.mapWidth - 2);
  }

  public move(xDelta: number, yDelta: number): void {
    this.x += xDelta;
    this.y += yDelta;
    this.resources += this.map[this.x][this.y].resources;
    this.surroundingCells = this.getSurroundingCells(this.mapWidth);
    this.state.next(new State(this.surroundingCells, this.resources));
  }

  public addResources(delta: number): void {
    this.resources += delta;
  }
}
