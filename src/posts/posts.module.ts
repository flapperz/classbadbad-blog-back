import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post, PostSchema } from '../schemas/post.schema';
import { User, UserSchema } from '../schemas/user.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])], //BEWARE TYPO!!!!
  controllers: [PostsController],
  providers: [PostsService],
  //exports: [UsersService]
})
export class PostsModule {}