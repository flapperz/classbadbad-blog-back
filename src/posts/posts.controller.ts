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
  } from "@nestjs/common";
import { Get, Post } from "@nestjs/common";
import { Post as IPost } from "../interfaces/post.interface";
import createPostDto from "./dto/create-post-dto";
import { PostsService } from "./posts.service";

@Controller("post")
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    findAllUsers(): Promise<IPost[]> {
        return this.postsService.findAll();
    }

    @Post("create")
    async createUser(@Body() user: createPostDto): Promise<any> {
        try {
            await this.postsService.create(user);
            return {
              status: 200,
              message: "ok"
            };
          } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}


