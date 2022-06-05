import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HandType } from 'src/app/enums/hand-type.enum';
import { PlayerType } from 'src/app/enums/player-type.enum';
import { Hand } from 'src/app/interfaces/hand.interface';
import { Player } from 'src/app/interfaces/player.interface';
import { GameDataService } from 'src/app/services/game-data.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss'],
})
export class ArenaComponent implements OnInit, OnDestroy {
  private readonly _hands: Hand[] = [
    {
      name: 'rock',
      beats: ['scissors'],
    },
    {
      name: 'paper',
      beats: ['rock'],
    },
    {
      name: 'scissors',
      beats: ['paper'],
    },
  ];
  private _players: Player[] = [];

  playerIndex = 0;
  currentPlayerType = PlayerType.Human;

  result = '';
  currentPlayer = '';
  playButtonText = '';

  playAgain = true;
  thinking = true;

  player1Form: FormGroup = this._fb.group({});
  player2Form: FormGroup = this._fb.group({});

  players$: Observable<Player[]> | undefined;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _gameService: GameService,
    private _dataService: GameDataService
  ) {}

  ngOnInit(): void {
    this.player1Form = this._fb.group({
      hand: ['rock'],
    });

    this.players$ = this._gameService.players$.pipe(
      tap((players) => {
        if (!players.length) this._router.navigate(['/']);
        this._players = players;
        this._resetCurrentPlayer();
      })
    );
  }

  ngOnDestroy(): void {
    //
  }

  private _generateHand = (): Hand => {
    const index = Math.floor(Math.random() * this._hands.length);
    return this._hands[index];
  };

  private _setPlayerHand = (player: Player) => {
    if (player.type === PlayerType.Human) {
      const { hand } = this.player1Form.value;
      player.hand = this._hands.find((h: Hand) => h.name === hand);

      return;
    }

    this.thinking = true;
    setTimeout(() => {
      player.hand = this._generateHand();
      this.thinking = false;
    }, 3000);
  };

  play(index: number = 0): void {
    if (this._players[index].type === PlayerType.Human)
      this._setPlayerHand(this._players[index]);

    if (index === 1) {
      this.playAgain = false;

      this.playerIndex = 0;
      this._resetCurrentPlayer();
      this.result = this._gameService.evaluateHands();

      return;
    }

    this.playerIndex = ++index;
    this._resetCurrentPlayer();
  }

  continue(): void {
    this.playAgain = true;
  }

  resetPlayers(): void {
    this._gameService.reset();
    this._router.navigate(['/']);
  }

  save(): void {
    console.log('saving game...');
  }

  private _resetCurrentPlayer = (): void => {
    if (!this._players.length) return;

    this.currentPlayer = this._players[this.playerIndex].name;
    this.currentPlayerType = this._players[this.playerIndex].type;
    this.playButtonText = `Lock In ${this.currentPlayer}'s' Hand`;

    if (this.currentPlayerType === PlayerType.Computer)
      this._setPlayerHand(this._players[this.playerIndex]);
  };
}
