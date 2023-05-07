import {Tile} from "./tile";

export class State {
  public surroundingTiles: Tile[][];
  public resources: number;

  constructor(surroundingTiles: Tile[][], resources: number) {
    this.surroundingTiles = surroundingTiles;
    this.resources = resources;
  }

}
