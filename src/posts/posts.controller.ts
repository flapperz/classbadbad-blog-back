import {
    Controller,
    Body,
    HttpException,
    HttpStatus,
    Res,
    Param,
    UseGuards,
    Req,
    Request,
    Get,
    Post,
    Patch,
    Delete,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Post as IPost } from '../interfaces/post.interface.entity';
import addCommentDto from './dto/add-comment.dto';
import createPostDto from './dto/create-post.dto';
import editPostDto from './dto/edit-post.dto';
import { PostsService } from './posts.service';

@Controller('post')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @ApiTags('Post')
    @Get()
    findAllPost(): Promise<IPost[]> {
        return this.postsService.findAllPost();
    }

    @ApiTags('Post')
    @Post()
    async createPost(@Body() post: createPostDto): Promise<any> {
        try {
            await this.postsService.create(post);
            return {
                status: 200,
                message: 'create ok',
            };
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiTags('Post')
    @Patch()
    async editPost(@Body() post: editPostDto): Promise<any> {
        try {
            await this.postsService.editPost(post);
            return {
                status: 200,
                message: 'edit post ok',
            };
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiTags('Post')
    @ApiParam({ name: 'postId', type: String })
    @Delete(':postId')
    async deletePost(@Param() params): Promise<any> {
        try {
            await this.postsService.deletePost(Types.ObjectId(params.postId));
            return {
                status: 200,
                message: 'delete post ok',
            };
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    //COMMENT SECTION

    @ApiTags('Comment')
    @ApiParam({ name: 'postId', type: String })
    @Get('comment/:postId')
    async findAllComments(@Param() params): Promise<any> {
        return this.postsService.findAllComments(Types.ObjectId(params.postId));
    }

    @ApiTags('Comment')
    @ApiParam({ name: 'postId', type: String })
    @Post('comment/:postId')
    async addComment(
        @Body() comment: addCommentDto,
        @Param() params,
    ): Promise<any> {
        try {
            await this.postsService.addComment(
                Types.ObjectId(params.postId),
                comment,
            );
            return {
                status: 200,
                message: 'add comment ok',
            };
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiTags('Comment')
    @ApiParam({ name: 'postId', type: String })
    @ApiParam({ name: 'commentId', type: String })
    @Patch('comment/:postId/:commentId')
    async editComment(
        @Body() comment: addCommentDto,
        @Param() params,
    ): Promise<any> {
        try {
            await this.postsService.editComment(
                Types.ObjectId(params.postId),
                params.commentId,
                comment,
            );
            return {
                status: 200,
                message: 'edit comment ok',
            };
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiTags('Comment')
    @ApiParam({ name: 'postId', type: String })
    @ApiParam({ name: 'commentId', type: String })
    @Delete('comment/:postId/:commentId')
    async deleteComment(@Param() params): Promise<any> {
        try {
            await this.postsService.deleteComment(
                Types.ObjectId(params.postId),
                params.commentId,
            );
            return {
                status: 200,
                message: 'delete comment ok',
            };
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
