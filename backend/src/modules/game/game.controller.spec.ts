import { Test } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameStatus } from './models/game.model';
import { Card } from './models/card.model';

describe('GameController', () => {
  let gameController: GameController;
  let gameService: GameService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameService],
    }).compile();

    gameService = moduleRef.get<GameService>(GameService);
    gameController = moduleRef.get<GameController>(GameController);
  });

  describe('getGameState', () => {
    it('should return current game state', async () => {
      const result = { 
        playerHand: [new Card('hearts', '5'), new Card('spades', '7')],
        dealerHand: [new Card('diamonds', '9'), new Card('clubs', '6')],
        turn: 'player' as const,
        status: GameStatus.Started,
        score: { player: 12, dealer: 15 },
      };

      jest.spyOn(gameService, 'getGameState').mockImplementation(() => Promise.resolve(result));

      expect(await gameController.getGameState()).toBe(result);
    });
  });

  describe('startGame', () => {
    it('should start a new game with given bet', async () => {
      const result = { 
        playerHand: [new Card('hearts', '3'), new Card('spades', '9')],
        dealerHand: [new Card('diamonds', '2'), new Card('clubs', '10')],
        turn: 'player' as const,
        status: GameStatus.Started,
        score: { player: 12, dealer: 12 },
      };
      
      jest.spyOn(gameService, 'startGame').mockImplementation(() => Promise.resolve(result));

      expect(await gameController.startGame(100)).toBe(result);
    });
  });

  // Follow similar patterns for the remaining endpoints

  describe('playerHit', () => {
    it('should perform player hit and return game state', async () => {
      const result = {
        playerHand: [new Card('hearts', '3'), new Card('spades', '9'), new Card('clubs', '8')],
        dealerHand: [new Card('diamonds', '2'), new Card('clubs', '10')],
        turn: 'player' as const,
        status: GameStatus.Started,
        score: { player: 20, dealer: 12 },
      };

      jest.spyOn(gameService, 'playerHit').mockImplementation(() => Promise.resolve(result));

      expect(await gameController.playerHit()).toBe(result);
    });
  });

  describe('playerStand', () => {
    it('should perform player stand and return game state', async () => {
      const result =   {
        playerHand: [new Card('hearts', '3'), new Card('spades', '9')],
        dealerHand: [new Card('diamonds', '2'), new Card('clubs', '10'), new Card('diamonds', '5')],
        turn: 'dealer' as const,
        status: GameStatus.Started,
        score: { player: 12, dealer: 17 },
      };

      jest.spyOn(gameService, 'playerStand').mockImplementation(() => Promise.resolve(result));

      expect(await gameController.playerStand()).toBe(result);
    });
  });

  describe('playerDoubleDown', () => {
    it('should perform player double down and return game state', async () => {
      const result = {
        playerHand: [new Card('hearts', '3'), new Card('spades', '9'), new Card('hearts', '8')],
        dealerHand: [new Card('diamonds', '2'), new Card('clubs', '10')],
        turn: 'player' as const,
        status: GameStatus.Started,
        score: { player: 20, dealer: 12 },
      };

      jest.spyOn(gameService, 'playerDoubleDown').mockImplementation(() => Promise.resolve(result));

      expect(await gameController.playerDoubleDown()).toBe(result);
    });
  });

  describe('playerSplit', () => {
    it('should perform player split and return game state', async () => {
      // Assuming split returns a second hand for player
      const result = {
        playerHand: [new Card('hearts', '8')],
        playerSecondHand: [new Card('spades', '8')],
        dealerHand: [new Card('diamonds', '2'), new Card('clubs', '10')],
        turn: 'player' as const,
        status: GameStatus.Started,
        score: { player: 8, dealer: 12 }, // score needs to be defined properly
      };

      jest.spyOn(gameService, 'playerSplit').mockImplementation(() => Promise.resolve(result));

      expect(await gameController.playerSplit()).toBe(result);
    });
  });

  describe('dealerTurn', () => {
    it('should perform dealer turn and return game state', async () => {
      const result = {
        playerHand: [new Card('hearts', '3'), new Card('spades', '9')],
        dealerHand: [new Card('diamonds', '2'), new Card('clubs', '10'), new Card('diamonds', '5')],
        turn: 'dealer' as const,
        status: GameStatus.Started,
        score: { player: 12, dealer: 17 },
      };

      jest.spyOn(gameService, 'dealerTurn').mockImplementation(() => Promise.resolve(result));

      expect(await gameController.dealerTurn()).toBe(result);
    });
  });

  describe('determineWinner', () => {
    it('should determine winner and return game state', async () => {
      const result = {
        playerHand: [new Card('hearts', '3'), new Card('spades', '9')],
        dealerHand: [new Card('diamonds', '2'), new Card('clubs', '10')],
        turn: 'dealer' as const,
        status: GameStatus.PlayerWins,
        score: { player: 12, dealer: 12 },
      };

      jest.spyOn(gameService, 'determineWinner').mockImplementation(() => Promise.resolve(result));

      expect(await gameController.determineWinner()).toBe(result);
    });
  });
});
