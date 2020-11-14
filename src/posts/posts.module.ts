import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from '../schemas/post.schema';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    ], //BEWARE TYPO!!!!
    controllers: [PostsController],
    providers: [PostsService],
    //exports: [UsersService]
})
export class PostsModule {}
