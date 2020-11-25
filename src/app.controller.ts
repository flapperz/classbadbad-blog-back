import {
    Request,
    Controller,
    Post,
    UseGuards,
    Body,
    Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import loginDto from './auth/dto/login.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService,
    ) {}

    @Get()
    getHello(): string {
        return 'hello world';
    }

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req, @Body() user: loginDto) {
        return this.authService.login(user.username);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        console.log('in');
        return req.user;
    }
}
