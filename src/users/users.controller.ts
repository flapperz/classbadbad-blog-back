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
import { User } from "../interfaces/user.interface";
import { UsersService } from "./users.service";

@Controller("user")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAllUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }

}


