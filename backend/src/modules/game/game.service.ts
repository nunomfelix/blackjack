import { Injectable } from '@nestjs/common';
import { Game, GameStatus } from './models/game.model';
import { GameState } from './interfaces/gamestate.interface';

@Injectable()
export class GameService {
  private game: Game;

  constructor() {
    this.game = new Game();
  }

  async getGameState(): Promise<GameState> {
    const { player, dealer, status, turn } = this.game;

    return {
      playerHand: player.hand.cards,
      dealerHand: dealer.hand.cards.map((card, index) => {
        if (index === 1 && status === GameStatus.Started && turn === 'player') {
          return { ...card, hidden: true };
        }
        return card;
      }),
      turn,
      status,
      score: {
        player: player.hand.calculateScore(),
        dealer: dealer.hand.calculateScore(),
      },
    };
  }

  async startGame(): Promise<GameState> {
    this.game.startGame();
    return this.getGameState();
  }

  async playerTurn(): Promise<GameState> {
    this.game.playerTurn();
    if (this.game.status === GameStatus.PlayerBusted) {
      this.game.dealerTurn();
    }
    return this.getGameState();
  }

  async dealerTurn(): Promise<GameState> {
    this.game.dealerTurn();
    return this.getGameState();
  }

  async determineWinner(): Promise<GameState> {
    const winner = this.game.determineWinner();
    return {
      winner,
      ...this.getGameState(),
    };
  }

  async resetGame(): Promise<GameState> {
    this.game.resetGame();
    return this.getGameState();
  }
}
