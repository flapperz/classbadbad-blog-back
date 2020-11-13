import {
    IsString,
    IsNotEmpty,
    IsDateString,
    IsNumber,
    IsBoolean
} from "class-validator";

class addCommentDto {
    @IsNotEmpty()
    @IsString()
    commentMsg : string;
}

export default addCommentDto;
