import { Request, Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import loginDto from './auth/dto/login.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req, @Body() body: loginDto) {
        return req.user;
    }
}
