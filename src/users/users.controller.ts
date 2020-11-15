import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UseGuards,
    Request,
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
import { User } from '../interfaces/user.interface.entity';
import createUserDto from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth('JWT')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Get all users',
    })
    @Get('all')
    findAllUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Get user from ID',
    })
    @ApiParam({ name: 'userId', type: String })
    @Get(':userId')
    async findAUser(@Request() req, @Param() params): Promise<User> {
        return this.usersService.findOne(Types.ObjectId(params.userId));
    }

    @UseGuards(JwtAuthGuard)
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
