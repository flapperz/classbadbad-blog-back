// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema, model } from 'mongoose';


export const UserSchema = new Schema({
    username: String,
    password: String,
    joinedSince: Date,
    role: Number
});

export const User = model('User', UserSchema);