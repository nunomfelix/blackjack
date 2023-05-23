import { middleware as expressCtx } from 'express-ctx';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import {
  NestExpressApplication,
  ExpressAdapter,
} from '@nestjs/platform-express';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.service';

async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Blackjack Backend')
    .setDescription('Blackjack backend description')
    .setVersion('1.0')
    .addTag('blackjack')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(expressCtx);

  const configService = app.select(SharedModule).get(ApiConfigService);

  const port = configService.appConfig.port;
  await app.listen(port);
  console.info(`server running on ${await app.getUrl()}`);

  return app;
}
bootstrap();
