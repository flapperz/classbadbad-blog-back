import { Type } from '@nestjs/common';
import { Document, Types } from 'mongoose';
import { User } from './user.interface.entity';

export interface Post extends Document {
    readonly userId: Types.ObjectId;
    readonly message: string;
    readonly timestamp: Date;
    readonly isEdited: boolean;
    readonly comments: [
        {
            _id: Types.ObjectId;
            userId: Types.ObjectId;
            commentMsg: string;
            timestamp: Date;
            isEdited: boolean;
        },
    ];
}
