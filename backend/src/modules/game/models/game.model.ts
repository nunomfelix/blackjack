import { IGame } from '../interfaces/game.interface';
import { Deck } from './deck.model';
import { Player } from './player.model';
import { Hand } from './hand.model';

export enum GameStatus {
  NotStarted = 'Game has not started',
  Started = 'Game has started',
  PlayerTurn = "Player's turn",
  DealerTurn = "Dealer's turn",
  PlayerBusted = 'Player busted',
  DealerBusted = 'Dealer busted',
  PlayerWins = 'Player wins',
  DealerWins = 'Dealer wins',
  Tie = 'Tie',
}

export class Game implements IGame {
  deck: Deck;
  player: Player;
  dealer: Player;
  turn: 'player' | 'dealer';
  status: GameStatus;

  constructor(playerBet: number) {
    this.resetGame(playerBet);
  }

  resetGame(playerBet: number): void {
    this.deck = new Deck();
    this.player = new Player(playerBet);
    this.dealer = new Player(playerBet, true); // dealer doesn't bet, so it doesn't matter
    this.turn = 'player';
    this.status = GameStatus.NotStarted;
  }

  startGame(): void {
    this.player.hand.addCard(this.deck.dealCard());
    this.player.hand.addCard(this.deck.dealCard());

    this.dealer.hand.addCard(this.deck.dealCard());
    this.dealer.hand.addCard(this.deck.dealCard());

    if (
      this.player.hand.calculateScore() === 21 &&
      this.dealer.hand.calculateScore() === 21
    ) {
      this.status = GameStatus.Tie;
    } else if (this.player.hand.calculateScore() === 21) {
      this.status = GameStatus.PlayerWins;
    } else if (this.dealer.hand.calculateScore() === 21) {
      this.status = GameStatus.DealerWins;
    } else {
      this.status = GameStatus.Started;
    }
  }

  playerHit(hand: Hand = this.player.hand): void {
    hand.addCard(this.deck.dealCard());

    if (hand.calculateScore() === 21) {
      this.status = GameStatus.PlayerWins;
      return;
    }

    if (this.player.hasBusted(hand)) {
      this.status = GameStatus.PlayerBusted;
      this.turn = 'dealer';
      this.dealerTurn();
    }
  }

  playerStand(): void {
    this.turn = 'dealer';
    this.status = GameStatus.DealerTurn;
    this.dealerTurn();
  }

  playerDoubleDown(): void {
    if (this.turn === 'player') {
      this.player.doubleBet();
      this.playerHit();
    } else {
      throw new Error("Can't double down: not player's turn");
    }
  }

  playerSplit(): void {
    if (this.turn === 'player') {
      this.player.split();
      this.playerHit();
    } else {
      throw new Error("Can't split: not player's turn");
    }
  }

  dealerTurn(): void {
    while (this.dealer.hand.calculateScore() < 17) {
      this.dealer.hand.addCard(this.deck.dealCard());
    }
    if (this.dealer.hasBusted()) {
      this.status = GameStatus.DealerBusted;
    } else {
      this.status = GameStatus.DealerTurn;
    }
    this.determineWinner();
  }

  determineWinner(): string {
    const playerScore = this.player.hand.calculateScore();
    const dealerScore = this.dealer.hand.calculateScore();

    if (this.player.hasBusted()) {
      this.status = GameStatus.DealerWins;
      return 'Dealer';
    }
    if (this.dealer.hasBusted()) {
      this.status = GameStatus.PlayerWins;
      return 'Player';
    }

    if (playerScore > dealerScore) {
      this.status = GameStatus.PlayerWins;
      return 'Player';
    } else if (dealerScore > playerScore) {
      this.status = GameStatus.DealerWins;
      return 'Dealer';
    } else {
      this.status = GameStatus.Tie;
      return 'Tie';
    }
  }
}
