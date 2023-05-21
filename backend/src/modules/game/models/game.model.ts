class Game {
  deck: Deck;
  player: Player;
  dealer: Player;
  turn: 'player' | 'dealer';

  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Player(true);
    this.turn = 'player';
  }

  startGame(): void {
    this.player.hand.addCard(this.deck.dealCard());
    this.player.hand.addCard(this.deck.dealCard());

    this.dealer.hand.addCard(this.deck.dealCard());
    this.dealer.hand.addCard(this.deck.dealCard());
  }

  playerTurn(): void {
    this.player.hand.addCard(this.deck.dealCard());
    if (this.player.hasBusted()) {
      this.turn = 'dealer';
    }
  }

  dealerTurn(): void {
    while (this.dealer.hand.calculateScore() < 17) {
      this.dealer.hand.addCard(this.deck.dealCard());
    }
    this.turn = 'player';
  }

  determineWinner(): string {
    const playerScore = this.player.hand.calculateScore();
    const dealerScore = this.dealer.hand.calculateScore();

    if (this.player.hasBusted()) return 'Dealer';
    if (this.dealer.hasBusted()) return 'Player';

    if (playerScore > dealerScore) {
      return 'Player';
    } else if (dealerScore > playerScore) {
      return 'Dealer';
    } else {
      return 'Tie';
    }
  }
}
