class Player {
  hand: Hand;
  isDealer: boolean;

  constructor(isDealer = false) {
    this.hand = new Hand();
    this.isDealer = isDealer;
  }

  hasBusted(): boolean {
    // Logic to determine if the player has busted.
  }
}
