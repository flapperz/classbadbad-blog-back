import {
    IsString,
    IsNotEmpty,
    IsDateString,
    IsNumber,
    IsBoolean,
} from 'class-validator';
import { User } from 'src/interfaces/user.interface';

class createPostDto {
    // userId : Partial<User>

    @IsNotEmpty()
    @IsString()
    message: string;

    // @IsDateString()
    // timestamp : Date;

    // @IsBoolean()
    // isEdited : Boolean;

    // @IsBoolean()
    // isDeleted : Boolean;

    // replies : [{
    //     userId : User
    //     replyMsg : String,
    //     timestamp : Date,
    //     isEdited : Boolean,
    //     isDeleted : Boolean
    // }]
}

export default createPostDto;
