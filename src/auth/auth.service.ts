import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneWithPass(username);
        if (user === null) return null;

        const isMatch = await new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                resolve(res);
            });
        });
        if (isMatch) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
