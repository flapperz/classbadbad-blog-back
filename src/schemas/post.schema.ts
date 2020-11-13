// import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import {  Types, Schema, model } from 'mongoose';
import { User } from './user.schema';

export const PostSchema = new Schema({
    userId : { type: Types.ObjectId, ref: 'User'},
    message : String,
    timestamp : Date,
    isEdited : Boolean,
    comments : [{
        _id: Types.ObjectId,
        userId : { type: Types.ObjectId, ref: 'User'},
        commentMsg : String,
        timestamp : Date,
        isEdited : Boolean,
    }]
});

export const Post = model('Post', PostSchema);
