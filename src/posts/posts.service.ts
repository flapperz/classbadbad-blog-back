import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { Post } from '../interfaces/post.interface';
import createPostDto from './dto/create-post-dto';
import editPostDto from './dto/edit-post-dto';
import addCommentDto from './dto/add-comment-dto';

// import createUserDto from './dto/create-user-dto';

@Injectable()
export class PostsService {
    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

    //POST SECTION
    async findAllPost(): Promise<Post[]> {
        return await this.postModel.find({});
    }

    async create(post: createPostDto): Promise<any> {
        const postEntity: Post = await this.postModel.create({
            ...post,
            userId: require('mongoose').Types.ObjectId(), //fake userId
            timestamp: new Date(),
            isEdited: false,
            comments: [],
        });

        return postEntity;
    }

    async editPost(post: editPostDto): Promise<any> {
        //TODO: check role
        return this.postModel.updateOne(
            { _id: post.postId },
            {
                ...post,
                isEdited: true,
                timestamp: new Date(),
            },
        );
    }

    async deletePost(postId: Types.ObjectId): Promise<any> {
        //TODO: check role
        return this.postModel.deleteOne({ _id: postId });
    }

    //COMMENTS SECTION

    async findAllComments(postId: Types.ObjectId): Promise<any> {
        return await this.postModel.findOne({ _id: postId }, { comments: 1 }); //Show just comment field
    }

    async addComment(
        postId: Types.ObjectId,
        comment: addCommentDto,
    ): Promise<any> {
        return this.postModel.updateOne(
            { _id: postId },
            {
                $push: {
                    comments: {
                        ...comment,
                        _id: require('mongoose').Types.ObjectId(),
                        userId: require('mongoose').Types.ObjectId(), //fake userId
                        timestamp: new Date(),
                        isEdited: false,
                    },
                },
            },
        );
    }

    async editComment(
        postId: Types.ObjectId,
        commentId: Types.ObjectId,
        comment: addCommentDto,
    ): Promise<any> {
        //TODO: check role
        return this.postModel.updateOne(
            { _id: postId, 'comments._id': commentId },
            {
                $set: {
                    'comments.$.commentMsg': comment.commentMsg,
                    'comments.$.isEdited': true,
                    'comments.$.timestamp': new Date(),
                },
            },
        );
    }

    async deleteComment(
        postId: Types.ObjectId,
        commentId: Types.ObjectId,
    ): Promise<any> {
        //TODO: check role
        return this.postModel.updateOne(
            { _id: postId },
            {
                $pull: {
                    comments: {
                        _id: commentId,
                    },
                },
            },
        );
    }
}
