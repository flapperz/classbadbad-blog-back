import { Document } from 'mongoose';
import { User } from '../interfaces/user.interface';

export interface Post extends Document {
    readonly userId: User;
    readonly message: string;
    readonly timestamp: Date;
    readonly isEdited: boolean;
    readonly isDeleted: boolean;
    readonly replies: [
        {
            userId: User;
            replyMsg: string;
            timestamp: Date;
            isEdited: boolean;
            isDeleted: boolean;
        },
    ];
}
