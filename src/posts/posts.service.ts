import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
// import { User, UserSchema } from '../schemas/user.schema';
import { Post } from '../interfaces/post.interface';
import createPostDto from './dto/create-post-dto';

// import createUserDto from './dto/create-user-dto';

@Injectable()
export class PostsService {
    constructor(@InjectModel('Post') private readonly postModel : Model<Post>) {}

    async findAll(): Promise<Post[]> {
        return await this.postModel.find({});
    }

    async create(post: createPostDto): Promise<any> {   
        const postEntity: Post = await this.postModel.create({
            ...post, 
            userId: ,
            timestamp: new Date(),
            isEdited: false,
            isDeleted: false,
            replies: []
        });

        return postEntity;
    }
}
