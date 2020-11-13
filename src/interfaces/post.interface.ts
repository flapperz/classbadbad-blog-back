import { Document } from 'mongoose';
import { User } from '../interfaces/user.interface'

export interface Post extends Document{
    readonly userId : User
    readonly message : String,
    readonly timestamp : Date,
    readonly isEdited : Boolean,
    readonly isDeleted : Boolean,
    readonly replies : [{
        userId : User
        replyMsg : String,
        timestamp : Date,
        isEdited : Boolean,
        isDeleted : Boolean
    }]
}