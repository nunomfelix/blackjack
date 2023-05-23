import { Controller, Get, Post, Body } from '@nestjs/common';
import { GameService } from './game.service';
import { GameState } from './interfaces/gamestate.interface';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  async getGameState(): Promise<GameState> {
    return this.gameService.getGameState();
  }

  @Post('start')
  async startGame(@Body('playerBet') playerBet: number): Promise<GameState> {
    return this.gameService.startGame(playerBet);
  }

  @Post('playerHit')
  async playerHit(): Promise<GameState> {
    return this.gameService.playerHit();
  }

  @Post('playerStand')
  async playerStand(): Promise<GameState> {
    return this.gameService.playerStand();
  }

  @Post('playerDoubleDown')
  async playerDoubleDown(): Promise<GameState> {
    return this.gameService.playerDoubleDown();
  }

  @Post('playerSplit')
  async playerSplit(): Promise<GameState> {
    return this.gameService.playerSplit();
  }

  @Post('dealerTurn')
  async dealerTurn(): Promise<GameState> {
    return this.gameService.dealerTurn();
  }

  @Get('winner')
  async determineWinner(): Promise<GameState> {
    return this.gameService.determineWinner();
  }

  @Post('reset')
  async resetGame(): Promise<GameState> {
    return this.gameService.resetGame();
  }
}
