interface IGame {
  deck: Deck;
  player: Player;
  dealer: Player;
  turn: 'player' | 'dealer';

  startGame(): void;
  playerTurn(card?: Card): void;
  dealerTurn(): void;
  determineWinner(): string;
}
