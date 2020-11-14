import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { User } from '../interfaces/user.interface.entity';
import createUserDto from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({
        summary: 'Get all users',
    })
    @Get('all')
    findAllUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @ApiOperation({
        summary: 'Get user from ID or Current user if no ID provided',
    })
    @ApiParam({ name: 'userId', type: String })
    @Get(':userId')
    async findAUser(@Param() params): Promise<User> {
        if (params.userId == '')
            return this.usersService.findOne(
                Types.ObjectId('5fad8d9830711d03b0b43a9c'),
            );
        return this.usersService.findOne(Types.ObjectId(params.userId));
    }

    @ApiOperation({
        summary: 'Create User',
    })
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
