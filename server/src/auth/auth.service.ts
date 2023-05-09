import { ConflictException, Injectable, UnauthorizedException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import { JwtService } from "@nestjs/jwt";
import { ExtractJwt } from 'passport-jwt';
import * as bcrypt from 'bcryptjs'
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) {}
    async register(registerDto: RegisterDto) : Promise<string> {
        const { name, email, password, gender, birthdate, preferences } = registerDto
        const hash = await bcrypt.hash(password, 10)
        let token = null;
        try {
            const user = await this.userModel.create({
                name,
                email,
                gender,
                birthdate,
                preferences,
                password: hash,
            })
            token = this.jwtService.sign({id: user._id});

            console.log(token);
        } catch(error) {
            if (error.code === 11000) {
                throw new ConflictException("Duplicated key")
            }
        }
        return "Succefully created !"
    }

    async login(loginDto : LoginDto) : Promise<{token: string, refresh : string}> {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException("Invalid credentials")
        }
        console.log(user);
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            throw new UnauthorizedException("Invalid credentials")
        }
        const token = this.jwtService.sign({id: user._id});
        const refreshToken = this.jwtService.sign({id: user._id}, {expiresIn: '90d', secret:'caca'});
        return {token: token ,refresh: refreshToken};
    }

    async refresh(user : User, actualRefresh: string) : Promise<{token: string, refresh : string}>{
        return {token: this.jwtService.sign({id: user._id}), refresh: actualRefresh}
    }
}