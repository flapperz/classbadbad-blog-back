import {
    IsString,
    IsNotEmpty,
    IsDateString,
    IsNumber,
    IsBoolean,
} from 'class-validator';
import { Types } from 'mongoose';

class editPostDto {
    @IsNotEmpty()
    postId: Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    message: string;
}

export default editPostDto;
