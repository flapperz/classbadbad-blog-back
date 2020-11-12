// import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import {  Types, Schema, model } from 'mongoose';
import { User } from './user.schema';

export const PostSchema = new Schema({
    postId : Schema.Types.ObjectId,
    userId : { type: Types.ObjectId, ref: 'User'},
    message : String,
    timestamp : Date,
    isEdited : Boolean,
    isDeleted : Boolean,
    replies : [{
        userId : { type: Types.ObjectId, ref: 'User'},
        replyMsg : String,
        timestamp : Date,
        isEdited : Boolean,
        isDeleted : Boolean
    }]
});

export const Post = model('Post', PostSchema);
