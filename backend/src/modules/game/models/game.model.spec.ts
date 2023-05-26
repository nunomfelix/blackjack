import { Game, GameStatus } from './game.model';
import { Deck } from './deck.model';
import { Player } from './player.model';
import { Hand } from './hand.model';
import { Card } from './card.model';

function createMockHand(): Hand {
  const hand = new Hand();
  
  const card1 = new Card('spades', 'A');
  const card2 = new Card('hearts', '10');

  hand.addCard(card1);
  hand.addCard(card2);

  return hand;
}
describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game(100);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should reset the game', () => {
    game.resetGame(100);

    expect(game.deck).toBeInstanceOf(Deck);
    expect(game.player).toBeInstanceOf(Player);
    expect(game.dealer).toBeInstanceOf(Player);
    expect(game.turn).toBe('player');
    expect(game.status).toBe(GameStatus.NotStarted);
  });

  it('should start the game', () => {
    jest.spyOn(game.deck, 'dealCard').mockReturnValueOnce(new Card('hearts','4'));
    jest.spyOn(game.deck, 'dealCard').mockReturnValueOnce(new Card('clubs','6'));
    jest.spyOn(game.deck, 'dealCard').mockReturnValueOnce(new Card('diamonds','10'));
    jest.spyOn(game.deck, 'dealCard').mockReturnValueOnce(new Card('hearts','6'));

    game.startGame();

    expect(game.player.hand.cards.length).toBe(2);
    expect(game.dealer.hand.cards.length).toBe(2);
    expect(game.status).toBe(GameStatus.Started);
  });

  it('should handle player hit', () => {
    jest.spyOn(game.deck, 'dealCard').mockReturnValueOnce(new Card('hearts','4'));
    jest.spyOn(game.deck, 'dealCard').mockReturnValueOnce(new Card('clubs','6'));
    jest.spyOn(game.deck, 'dealCard').mockReturnValueOnce(new Card('diamonds','10'));
    jest.spyOn(game.deck, 'dealCard').mockReturnValueOnce(new Card('hearts','6'));

    game.startGame();
    
    jest.spyOn(game.deck, 'dealCard').mockReturnValueOnce(new Card('hearts','8'));
    jest.spyOn(game.player.hand, 'addCard');

    game.playerHit();

    expect(game.player.hand.addCard).toHaveBeenCalled();
    expect(game.status).toBe(GameStatus.Started); 
  });

  it('should handle player stand', () => {
    game.playerStand();

    expect(game.turn).toBe('dealer');
  });

  it('should handle player double down', () => {
    game.playerDoubleDown();

    expect(game.player.hand.cards.length).toBe(1); 
  });

  it('should handle player split', () => {
    jest.spyOn(game.deck, 'dealCard').mockReturnValueOnce(new Card('hearts','J'));
    jest.spyOn(game.deck, 'dealCard').mockReturnValueOnce(new Card('clubs','J'));

    game.startGame();

    game.playerSplit();

    expect(game.player.hand.cards.length).toBe(2); 
  });

  it('should handle dealer turn', () => {
    jest.spyOn(game.deck, 'dealCard').mockReturnValue(new Card('clubs','2'));

    game.dealerTurn();

    expect(game.dealer.hand.cards.length).toBeGreaterThan(2);
    expect(game.status).toBe(GameStatus.DealerWins); 
  });

  it('should determine the winner', () => {
    jest.spyOn(game.player.hand, 'calculateScore').mockReturnValue(19);
    jest.spyOn(game.dealer.hand, 'calculateScore').mockReturnValue(17);

    const winner = game.determineWinner();

    expect(winner).toBe('Player');
    expect(game.status).toBe(GameStatus.PlayerWins);
  });
});

describe('Deck', () => {
  let deck: Deck;

  beforeEach(() => {
    deck = new Deck();
  });

  it('should create a deck', () => {
    expect(deck.cards.length).toBe(52);
  });

  it('should shuffle the deck', () => {
    const originalCards = [...deck.cards];

    deck.shuffleDeck();

    expect(deck.cards).not.toEqual(originalCards);
  });

  it('should deal a card', () => {
    const dealtCard = deck.dealCard();

    expect(deck.cards.length).toBe(51);
    expect(dealtCard).toBeDefined();
  });

  it('should throw an error when dealing from an empty deck', () => {
    deck.cards = [];

    expect(() => {
      deck.dealCard();
    }).toThrowError('No cards left in the deck');
  });
});

describe('Hand', () => {
  let hand: Hand;

  beforeEach(() => {
    hand = new Hand();
  });

  it('should add a card to the hand', () => {
    const card = new Card('suits','J');

    hand.addCard(card);

    expect(hand.cards.length).toBe(1);
    expect(hand.cards[0]).toBe(card);
  });

  it('should calculate the score of the hand', () => {
    const card1 = new Card('clubs','10')
    const card2 = new Card('diamonds','A');

    hand.addCard(card1);
    hand.addCard(card2);

    expect(hand.calculateScore()).toBe(21);
  });
});

describe('Player', () => {
  let player: Player;

  beforeEach(() => {
    player = new Player(100);
  });

  it('should check if the player has busted', () => {
    const hand: Hand = createMockHand();

    jest.spyOn(hand, 'calculateScore').mockReturnValue(22);

    const hasBusted = player.hasBusted(hand);

    expect(hasBusted).toBe(true);
  });

  it('should double the bet', () => {
    const originalBet = player.bet;

    player.doubleBet();

    expect(player.bet).toBe(originalBet * 2);
  });
});
