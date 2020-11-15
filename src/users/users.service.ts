import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../interfaces/user.interface.entity';
import createUserDto from './dto/create-user.dto';
import bcrypt from 'bcrypt';

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

    async findOneWithPass(username: string): Promise<User> {
        return await this.userModel.findOne({ username });
    }

    async create(user: createUserDto): Promise<any> {
        if (
            (await this.userModel.findOne({ username: user.username })) !== null
        )
            throw new Error('User existed');

        const saltRounds = 10;
        const { password, ...otherInfo } = user;
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        });
        const userEntity: User = await this.userModel.create({
            ...otherInfo,
            password: hashedPassword,
            joinedSince: new Date(),
        });

        return userEntity;
    }
}
