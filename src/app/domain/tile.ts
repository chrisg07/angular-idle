export class Tile {
  public resources = 0;
  public isWall = false;

  constructor() {
    this.resources = Math.floor(Math.random() * 10);
  }
}
