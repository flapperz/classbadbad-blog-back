import { IsNotEmpty, IsString } from 'class-validator';

export default class loginDto {
    // userId: number,

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    password: string;
}
