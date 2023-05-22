import { GameStatus } from '../models/game.model';

export interface IGame {
  deck: Deck;
  player: Player;
  dealer: Player;
  turn: 'player' | 'dealer';
  status: GameStatus;

  resetGame(): void;
  startGame(): void;
  playerTurn(card?: Card): void;
  dealerTurn(): void;
  determineWinner(): string;
}
