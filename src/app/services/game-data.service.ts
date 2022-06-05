import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player } from '../interfaces/player.interface';

Injectable({ providedIn: 'root' });
export class GameDataService {
  constructor() {}

  save(name: string = 'Saved Game', players: Player[]) {
    // we save the game
  }

  load(): Observable<Player[]> {
    // we return the selected save game's players object
    return of([]);
  }
}
