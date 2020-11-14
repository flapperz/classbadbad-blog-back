import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class createUserDto {
    // userId: number,

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    password: string;

    // @IsDateString()
    // joinedSince: Date;

    @IsNotEmpty()
    @IsNumber()
    role: number;
}

export default createUserDto;
