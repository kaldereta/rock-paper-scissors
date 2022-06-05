import { PlayerType } from '../enums/player-type.enum';
import { Hand } from './hand.interface';

export interface Player {
  name: string;
  type: PlayerType;
  score: number;
  hand?: Hand;
}
