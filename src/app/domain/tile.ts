export class Tile {
  public resources = 0;
  public isWall = false;
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.resources = Math.floor(Math.random() * 10);
  }
}
