import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { PostSchema } from '../schemas/post.schema';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
        UsersModule
    ], //BEWARE TYPO!!!!
    controllers: [PostsController],
    providers: [PostsService],
    //exports: [UsersService]
})
export class PostsModule {}
