import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  async start(createGameDto: CreateGameDto) {
    return 'This action starts a new game';
  }

  async turn() {
    return `This action takes a turn all game`;
  }

  async state() {
    return `This action returns the state of the game`;
  }

  async end() {
    return `This action ends the game`;
  }

}
