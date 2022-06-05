import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { PlayerType } from 'src/app/enums/player-type.enum';
import { Player } from 'src/app/interfaces/player.interface';
import { GameDataService } from 'src/app/services/game-data.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss'],
})
export class GameSetupComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  playersOption: FormGroup = this._fb.group({});
  playersForm: FormGroup = this._fb.group({});
  disablePlayer2 = false;
  disablePlay = true;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _gameService: GameService,
    private _dataService: GameDataService
  ) {}

  private _players: Player[] = [
    {
      name: '',
      type: PlayerType.Human,
      score: 0,
    },
    {
      name: '',
      type: PlayerType.Human,
      score: 0,
    },
  ];

  ngOnInit(): void {
    this.playersOption = this._fb.group({
      options: ['1'],
    });

    this.playersForm = this._fb.group({
      player1: ['', [Validators.required]],
      player2: ['', [Validators.required]],
    });

    this._subscription = this.playersOption.valueChanges.subscribe((value) => {
      const { options } = value;
      this.disablePlayer2 = options === '2';

      this.playersForm
        .get('player2')
        ?.patchValue(this.disablePlayer2 ? 'Computer' : '');

      this._players[1].type = this.disablePlayer2
        ? PlayerType.Computer
        : PlayerType.Human;
    });

    const subscription = this.playersForm.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe((values) => {
        const { player1, player2 } = values;
        this._players.forEach((p, i) => {
          p.name = i === 0 ? player1 : player2;
        });

        this.disablePlay = !(player1.length && player2.length);
      });

    this._subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  play(): void {
    this._gameService.setPlayers(this._players);
    this._router.navigate(['/arena']);
  }

  loadGame(): void {
    console.log('show list of saved games');
  }
}
