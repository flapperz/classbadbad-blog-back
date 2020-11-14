import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'src/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        MongooseModule.forRoot(config.MONGODB_URI),
        UsersModule,
        PostsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
