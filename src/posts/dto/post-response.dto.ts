import { Types, Document } from 'mongoose';

export class PostResponseObject extends Document {
    readonly userId: Types.ObjectId;
    readonly message: string;
    readonly timestamp: Date;
    readonly isEdited: boolean;
    readonly comments: [
        {
            userId: Types.ObjectId;
            commentMsg: string;
            timestamp: Date;
            isEdited: boolean;
        },
    ];
}
