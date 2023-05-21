class Player {
  hand: Hand;
  isDealer: boolean;

  constructor(isDealer = false) {
    this.hand = new Hand();
    this.isDealer = isDealer;
  }

  hasBusted(): boolean {
    return this.hand.calculateScore() > 21;
  }
}
