import { IGame } from '../interfaces/game.interface';

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

  constructor() {
    this.resetGame();
  }

  resetGame(): void {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Player(true);
    this.turn = 'player';
    this.status = GameStatus.NotStarted;
  }

  startGame(): void {
    this.player.hand.addCard(this.deck.dealCard());
    this.player.hand.addCard(this.deck.dealCard());

    this.dealer.hand.addCard(this.deck.dealCard());
    this.dealer.hand.addCard(this.deck.dealCard());

    this.status = GameStatus.Started;
  }

  playerTurn(): void {
    this.player.hand.addCard(this.deck.dealCard());
    if (this.player.hasBusted()) {
      this.status = GameStatus.PlayerBusted;
      this.turn = 'dealer';
    } else {
      this.status = GameStatus.PlayerTurn;
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
    this.turn = 'player';
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
