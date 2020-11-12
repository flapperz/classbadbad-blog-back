import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { User, UserSchema } from '../schemas/user.schema';
import { User } from '../interfaces/user.interface'
import createUserDto from './dto/create-user-dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel : Model<User>) {}

    async findAll(): Promise<User[]> {
        return await this.userModel.find({});
    }

    async create(user: createUserDto): Promise<any> {
        user.joinedSince = new Date();
        const userEntity: User = await this.userModel.create(user);

        return userEntity;
    }
}
