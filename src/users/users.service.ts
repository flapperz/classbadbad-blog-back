import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { User, UserSchema } from '../schemas/user.schema';
import { User } from '../interfaces/user.interface'

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel : Model<User>) {}
}