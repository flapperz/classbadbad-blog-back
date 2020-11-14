import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

class editPostDto {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    postId: Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    message: string;
}

export default editPostDto;
