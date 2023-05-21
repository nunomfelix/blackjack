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
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('start')
  async start(@Body() createGameDto: CreateGameDto) {
    return await this.gameService.start(createGameDto);
  }

  @Post('turn')
  async turn() {
    return await this.gameService.turn();
  }

  @Get('state')
  async state() {
    return await this.gameService.state();
  }

  @Post('end')
  async end() {
    return await this.gameService.end();
  }
}
