import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
    Request,
    Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Post as IPost } from '../interfaces/post.interface.entity';
import addCommentDto from './dto/add-comment.dto';
import createPostDto from './dto/create-post.dto';
import editPostDto from './dto/edit-post.dto';
import { PostsService } from './posts.service';

@ApiBearerAuth('JWT')
@Controller('post')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @ApiOperation({
        summary: 'Get all posts and comments (Entire feed)',
    })
    @ApiTags('Post')
    @UseGuards(JwtAuthGuard)
    @Get()
    findAllPost(): Promise<IPost[]> {
        return this.postsService.findAllPost();
    }

    @ApiOperation({
        summary: 'Create Post',
    })
    @ApiTags('Post')
    @UseGuards(JwtAuthGuard)
    @Post()
    async createPost(
        @Request() req,
        @Body() post: createPostDto,
    ): Promise<any> {
        try {
            await this.postsService.create(post, req.user.userId);
            return {
                status: HttpStatus.OK,
                message: 'create ok',
            };
        } catch (err) {
            if (err.message == 'auth err') {
                throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
            } else {
                throw new HttpException(
                    'create post err',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
    }

    @ApiOperation({
        summary: 'Update Post',
    })
    @ApiTags('Post')
    @UseGuards(JwtAuthGuard)
    @Patch()
    async editPost(@Request() req, @Body() post: editPostDto): Promise<any> {
        try {
            await this.postsService.editPost(post, req.user);
            return {
                status: HttpStatus.OK,
                message: 'edit post ok',
            };
        } catch (err) {
            if (err.message == 'auth err') {
                throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
            } else {
                throw new HttpException(
                    'update post err',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
    }

    @ApiOperation({
        summary: 'Delete Post',
    })
    @ApiTags('Post')
    @ApiParam({ name: 'postId', type: String })
    @UseGuards(JwtAuthGuard)
    @Delete(':postId')
    async deletePost(@Request() req, @Param() params): Promise<any> {
        try {
            await this.postsService.deletePost(
                Types.ObjectId(params.postId),
                req.user,
            );
            return {
                status: HttpStatus.OK,
                message: 'delete post ok',
            };
        } catch (err) {
            if (err.message == 'auth err') {
                throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
            } else {
                throw new HttpException(
                    'delete post err',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
    }

    //COMMENT SECTION
    @ApiOperation({
        summary: 'Get all comments in a post',
    })
    @ApiTags('Comment')
    @ApiParam({ name: 'postId', type: String })
    @UseGuards(JwtAuthGuard)
    @Get('comment/:postId')
    async findAllComments(@Param() params): Promise<any> {
        return this.postsService.findAllComments(Types.ObjectId(params.postId));
    }

    @ApiOperation({
        summary: 'Create Comment',
    })
    @ApiTags('Comment')
    @ApiParam({ name: 'postId', type: String })
    @UseGuards(JwtAuthGuard)
    @Post('comment/:postId')
    async addComment(
        @Request() req,
        @Body() comment: addCommentDto,
        @Param() params,
    ): Promise<any> {
        try {
            await this.postsService.addComment(
                Types.ObjectId(params.postId),
                comment,
                req.user,
            );
            return {
                status: HttpStatus.OK,
                message: 'add comment ok',
            };
        } catch (err) {
            if (err.message == 'auth err') {
                throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
            } else {
                throw new HttpException(
                    'add comment err',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
    }

    @ApiOperation({
        summary: 'Update Comment',
    })
    @ApiTags('Comment')
    @ApiParam({ name: 'postId', type: String })
    @ApiParam({ name: 'commentId', type: String })
    @UseGuards(JwtAuthGuard)
    @Patch('comment/:postId/:commentId')
    async editComment(
        @Request() req,
        @Body() comment: addCommentDto,
        @Param() params,
    ): Promise<any> {
        try {
            await this.postsService.editComment(
                Types.ObjectId(params.postId),
                params.commentId,
                comment,
                req.user,
            );
            return {
                status: HttpStatus.OK,
                message: 'edit comment ok',
            };
        } catch (err) {
            if (err.message == 'auth err') {
                throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
            } else {
                throw new HttpException(
                    'edit comment err',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
    }

    @ApiOperation({
        summary: 'Delete Comment',
    })
    @ApiTags('Comment')
    @ApiParam({ name: 'postId', type: String })
    @ApiParam({ name: 'commentId', type: String })
    @UseGuards(JwtAuthGuard)
    @Delete('comment/:postId/:commentId')
    async deleteComment(@Request() req, @Param() params): Promise<any> {
        try {
            await this.postsService.deleteComment(
                Types.ObjectId(params.postId),
                params.commentId,
                req.user,
            );
            return {
                status: HttpStatus.OK,
                message: 'delete comment ok',
            };
        } catch (err) {
            if (err.message == 'auth err') {
                throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
            } else {
                throw new HttpException(
                    'delete comment err',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
    }
}
