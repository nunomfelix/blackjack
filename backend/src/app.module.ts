import { Module } from '@nestjs/common';
import { GameModule } from './modules/game/game.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GameModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [],
})
export class AppModule {}
