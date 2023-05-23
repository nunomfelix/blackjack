import { Deck } from '../models/deck.model';
import { GameStatus } from '../models/game.model';
import { Player } from '../models/player.model';
import { Hand } from '../models/hand.model';

export interface IGame {
  deck: Deck;
  player: Player;
  dealer: Player;
  turn: 'player' | 'dealer';
  status: GameStatus;

  resetGame(playerBet: number): void;
  startGame(): void;
  playerHit(hand?: Hand): void;
  playerStand(): void;
  playerDoubleDown(): void;
  playerSplit(): void;
  dealerTurn(): void;
  determineWinner(): string;
}
