import { Injectable } from '@nestjs/common';
import { Game, GameStatus } from './models/game.model';
import { GameState } from './interfaces/gamestate.interface';

@Injectable()
export class GameService {
  private game: Game;

  constructor() {
    // we can initialize with any arbitrary bet
    this.game = new Game(0);
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

  async startGame(playerBet: number): Promise<GameState> {
    this.game.resetGame(playerBet);
    this.game.startGame();
    return this.getGameState();
  }

  async playerHit(): Promise<GameState> {
    this.game.playerHit();
    if (this.game.status === GameStatus.PlayerBusted) {
      this.game.dealerTurn();
    }
    return this.getGameState();
  }

  async playerStand(): Promise<GameState> {
    this.game.playerStand();
    return this.getGameState();
  }

  async playerDoubleDown(): Promise<GameState> {
    this.game.playerDoubleDown();
    return this.getGameState();
  }

  async playerSplit(): Promise<GameState> {
    this.game.playerSplit();
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
    this.game.resetGame(0); // we can reset with any arbitrary bet
    return this.getGameState();
  }
}
