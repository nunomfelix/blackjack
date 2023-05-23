import { Card } from './card.model';

export class Hand {
  cards: Card[];

  constructor() {
    this.cards = [];
  }

  addCard(card: Card): void {
    this.cards.push(card);
  }

  calculateScore(): number {
    let score = 0;
    let aceCount = 0;

    for (const card of this.cards) {
      if (card.value === 'A') {
        aceCount += 1;
        score += 11;
      } else if (['K', 'Q', 'J'].includes(card.value)) {
        score += 10;
      } else {
        score += Number(card.value);
      }
    }

    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount -= 1;
    }

    return score;
  }
}
