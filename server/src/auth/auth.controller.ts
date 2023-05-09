import { Controller, Get, Post, Headers, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshGuard } from './guards/refresh-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    register(@Body() registerDto: RegisterDto) : Promise<string> {
        return this.authService.register(registerDto)
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto) : Promise<{token : string, refresh : string}> {
        return this.authService.login(loginDto);
    }

    @UseGuards(RefreshGuard)
    @Post('/refresh')
    refresh(@Req() req, @Headers() head) : Promise<{token: string, refresh : string}> {
        return this.authService.refresh(req.user, head.refresh);
    }
}