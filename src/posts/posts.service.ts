import { Model, Types } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { Post } from '../interfaces/post.interface.entity';
import createPostDto from './dto/create-post.dto';
import editPostDto from './dto/edit-post.dto';
import addCommentDto from './dto/add-comment.dto';
import mongoose from 'mongoose';
import { types } from 'util';
import userToken from 'src/interfaces/token.interface';
import { UsersService } from 'src/users/users.service';

// import createUserDto from './dto/create-user-dto';

@Injectable()
export class PostsService {
    
    constructor(
        private readonly usersService: UsersService,
        @InjectModel('Post') private readonly postModel: Model<Post>) {}

    //POST SECTION
    async findAllPost(): Promise<any> {
        let postData = await this.postModel.find({}).select('-__v').lean();
        let userData = await this.usersService.findAll();
        
        
        const userDict = {};

        userData.forEach((user) => {
            const {_id, ...other} = user;
            userDict[user._id.toString()] = {...other};
        });

        return postData.map((post) => {
            const {comments, ...other} = post;
            const new_comments = comments.map((comment) => {
                return {...comment, username: userDict[comment.userId.toHexString()]._doc.username};
            })
            return {...other, username: userDict[post.userId.toHexString()]._doc.username, new_comments};
        });

    }

    async create(post: createPostDto, userId: string): Promise<any> {
        const postEntity: Post = await this.postModel.create({
            ...post,
            userId: Types.ObjectId(userId), //fake userId
            timestamp: new Date(),
            isEdited: false,
            comments: [],
        });

        return postEntity;
    }

    async editPost(post: editPostDto, user: userToken): Promise<any> {
        const res = await this.postModel.findOne({ _id: post.postId });
        if (res.userId.toHexString() == user.userId || user.role == 0)
            return await this.postModel.updateOne(
                { _id: post.postId },
                {
                    ...post,
                    isEdited: true,
                    timestamp: new Date(),
                },
            );
        else throw new Error('auth err');
    }

    async deletePost(postId: Types.ObjectId, user: userToken): Promise<any> {
        const res = await this.postModel.findOne({ _id: postId });

        if (res.userId.toHexString() == user.userId || user.role == 0)
            return this.postModel.deleteOne({ _id: postId });
        else throw new Error('auth err');
    }

    //COMMENTS SECTION

    async findAllComments(postId: Types.ObjectId): Promise<any> {
        return await this.postModel.findOne({ _id: postId }, { comments: 1 }); //Show just comment field
    }

    async addComment(
        postId: Types.ObjectId,
        comment: addCommentDto,
        user: userToken,
    ): Promise<any> {
        return this.postModel.updateOne(
            { _id: postId },
            {
                $push: {
                    comments: {
                        ...comment,
                        _id: mongoose.Types.ObjectId(),
                        userId: Types.ObjectId(user.userId), //fake userId
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
        user: userToken,
    ): Promise<any> {
        const res = await this.postModel
            .findOne({
                _id: postId,
            })
            .select({ comments: { $elemMatch: { _id: commentId } } });
        if (
            res.comments[0].userId.toHexString() === user.userId ||
            user.role === 0
        )
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
        else throw new Error('auth err');
    }

    async deleteComment(
        postId: Types.ObjectId,
        commentId: Types.ObjectId,
        user: userToken,
    ): Promise<any> {
        const res = await this.postModel
            .findOne({
                _id: postId,
            })
            .select({ comments: { $elemMatch: { _id: commentId } } });
        if (
            res.comments[0].userId.toHexString() === user.userId ||
            user.role === 0
        )
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
        else throw new Error('auth err');
    }
}
