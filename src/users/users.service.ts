import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { User, UserSchema } from '../schemas/user.schema';
import { User } from '../interfaces/user.interface.entity';
import createUserDto from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        return await this.userModel.find({}).select('-password');
    }

    async findOne(userId: Types.ObjectId): Promise<User> {
        return await this.userModel
            .findOne({ _id: userId })
            .select('-password');
    }

    async create(user: createUserDto): Promise<any> {
        const userEntity: User = await this.userModel.create({
            ...user,
            joinedSince: new Date(),
        });

        return userEntity;
    }
}
