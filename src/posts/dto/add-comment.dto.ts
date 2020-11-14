import { IsNotEmpty, IsString } from 'class-validator';

class addCommentDto {
    @IsNotEmpty()
    @IsString()
    commentMsg: string;
}

export default addCommentDto;
