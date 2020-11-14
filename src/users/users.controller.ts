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
} from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { User } from '../interfaces/user.interface.entity';
import createUserDto from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('all')
    findAllUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @ApiParam({ name: 'userId', type: String })
    @Get(':userId')
    async findAUser(@Param() params): Promise<User> {
        return this.usersService.findOne(Types.ObjectId(params.userId));
    }

    @Post()
    async createUser(@Body() user: createUserDto): Promise<any> {
        try {
            await this.usersService.create(user);
            return {
                status: 200,
                message: 'ok',
            };
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
