// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  Types, Schema, model } from 'mongoose';

export const UserSchema = new Schema({
    userId: Schema.Types.ObjectId,
    username: String,
    password: String,
    joinedSince: Date,
    role: {type: Number, enum: ['user', 'admin'], default: 'user'}
});

export const User = model('User', UserSchema);