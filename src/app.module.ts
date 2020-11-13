import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import config from "src/config";

import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGODB_URI),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
