import { Module } from '@nestjs/common';
import { GameModule } from './modules/game/game.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    GameModule,
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [],
})
export class AppModule {}
