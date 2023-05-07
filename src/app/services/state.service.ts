import { Injectable } from '@angular/core';
import {Tile} from "../domain/tile";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private map: Array<Array<Tile>>
  constructor() { }
}
