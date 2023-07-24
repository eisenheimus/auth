import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from 'src/users/users.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import config  from 'src/config';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: './db.sqlite',
    entities: [join(__dirname, '**', '*.entity.{js,ts}')],
    // entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
    autoLoadEntities: true,
  }), ConfigModule.forRoot({
    isGlobal: true,
    load: [config]
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
