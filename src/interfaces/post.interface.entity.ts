import { Document, Types } from 'mongoose';
import { User } from './user.interface.entity';

export interface Post extends Document {
    readonly userId: Types.ObjectId;
    readonly message: string;
    readonly timestamp: Date;
    readonly isEdited: boolean;
    readonly replies: [
        {
            userId: Types.ObjectId;
            replyMsg: string;
            timestamp: Date;
            isEdited: boolean;
        },
    ];
}
