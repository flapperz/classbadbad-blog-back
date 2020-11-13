import { Document } from 'mongoose';

export interface User extends Document{
    readonly userId: number,
    readonly username: string,
    readonly password: string,
    readonly joinedSince: Date,
    readonly role: number
}