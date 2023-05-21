class Deck {
  cards: Card[];

  constructor() {
    this.cards = [];
    this.createDeck();
    this.shuffleDeck();
  }

  createDeck(): void {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = [
      'A',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
    ];

    for (const suit of suits) {
      for (const value of values) {
        this.cards.push(new Card(suit, value));
      }
    }
  }

  shuffleDeck(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  dealCard(): Card {
    if (this.cards.length > 0) {
      return this.cards.pop() as Card; // as Card is used to avoid TypeScript error
    } else {
      throw new Error('No cards left in the deck');
    }
  }
}
