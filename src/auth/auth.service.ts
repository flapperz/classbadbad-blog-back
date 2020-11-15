import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

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

    async login(username) {
        const user = await this.usersService.findOneWithPass(username);
        const payload = {
            username: username,
            sub: user._id,
            role: user.role,
            joinedSince: user.joinedSince,
        };
        if (user === null) return null;
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
