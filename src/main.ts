import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {ConfigService} from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService  = app.get<ConfigService>(ConfigService);
  const port = await configService.get('port');
  app.setGlobalPrefix('api')
  console.log(port)
  await app.listen(4000);
}
bootstrap();
