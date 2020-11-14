import {
    IsString,
    IsNotEmpty,
    IsDateString,
    IsNumber,
    IsBoolean,
} from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

class editPostDto {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    postId: Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    message: string;
}

export default editPostDto;
