import { GameStatus } from '../models/game.model';

export interface GameState {
  playerHand: Card[];
  dealerHand: Card[];
  turn: 'player' | 'dealer';
  status: GameStatus;
  score: {
    player: number;
    dealer: number;
  };
  winner?: 'Player' | 'Dealer' | 'Tie';
}

export default GameState;
