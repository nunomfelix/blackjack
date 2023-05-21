class Game implements IGame {
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
    // Logic to start the game.
  }

  playerTurn(): void {
    // Logic to handle the player's turn.
  }

  dealerTurn(): void {
    // Logic to handle the dealer's turn.
  }

  determineWinner(): string {
    // Logic to determine the winner.
  }
}
