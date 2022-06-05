import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from '../interfaces/player.interface';
import { GameDataService } from './game-data.service';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor() {}

  private _players: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>(
    []
  );

  reset(): void {
    this._players.next([]);
  }

  setPlayers(players: Player[]) {
    this._players.next(players);
  }

  get players$(): Observable<Player[]> {
    return this._players.asObservable();
  }

  evaluateHands(): string {
    const players = this._players.getValue();
    if (players[0].hand?.name === players[1].hand?.name) return "It's a tie";

    const index = players[0].hand?.beats.some(
      (b) => b === players[1].hand?.name
    )
      ? 0
      : 1;

    players[index].score = ++players[index].score;
    return `${players[index].name}'s WINS! ${players[index].hand?.name} beats ${
      players[index === 0 ? 1 : 0].hand?.name
    }`;
  }
}
