import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GameService } from './game.service';
import GameState from './interfaces/gamestate.interface';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  async getGameState(): Promise<GameState> {
    return this.gameService.getGameState();
  }

  @Post('/start')
  async startGame(): Promise<GameState> {
    return this.gameService.startGame();
  }

  @Post('/playerTurn')
  async playerTurn(): Promise<GameState> {
    return this.gameService.playerTurn();
  }

  @Post('/dealerTurn')
  async dealerTurn(): Promise<GameState> {
    return this.gameService.dealerTurn();
  }

  @Get('/winner')
  async determineWinner(): Promise<GameState> {
    return this.gameService.determineWinner();
  }

  @Post('/reset')
  async resetGame(): Promise<GameState> {
    return this.gameService.resetGame();
  }
}
