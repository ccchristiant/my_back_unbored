import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly AuthService: AuthService) {}
    @Get("/login")
    getLogin(): string {
        return this.AuthService.getLogin();
    }
    @Get("/register")
    getRegister(): string {
        return this.AuthService.getRegister();
    }
}