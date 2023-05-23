import { Hand } from './hand.model';

export class Player {
  hand: Hand;
  splitHand: Hand | null;
  isDealer: boolean;
  bet: number;
  originalBet: number; // keep track of the original bet for split

  constructor(bet: number, isDealer = false) {
    this.hand = new Hand();
    this.splitHand = null; // initially there's no split hand
    this.bet = bet;
    this.originalBet = bet;
    this.isDealer = isDealer;
  }

  hasBusted(hand: Hand = this.hand): boolean {
    return hand.calculateScore() > 21;
  }

  canSplit(): boolean {
    return (
      this.hand.cards.length === 2 &&
      this.hand.cards[0].value === this.hand.cards[1].value
    );
  }

  split(): void {
    if (!this.canSplit()) {
      throw new Error("Can't split this hand");
    }

    // create new hand and move one card to it
    this.splitHand = new Hand();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.splitHand.addCard(this.hand.cards.pop()!);

    // halve the current bet
    this.bet = this.bet / 2;
  }

  doubleBet(): void {
    this.bet = this.bet * 2; // double the bet
  }
}
