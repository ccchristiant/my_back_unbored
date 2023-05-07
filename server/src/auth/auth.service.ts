import { Injectable, UnauthorizedException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import { JwtService } from "@nestjs/jwt";

import * as bcrypt from 'bcryptjs'
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}
    async register(registerDto: RegisterDto) : Promise<string> {
        const { name, email, password, gender, birthdate, preferences } = registerDto
        console.log(registerDto);
        // const hash = await bcrypt.hash(password, 10)
        try {
            const user = await this.userModel.create({
                name,
                email,
                gender,
                birthdate,
                preferences,
                password,
            })
        } catch(error) {
            if (error.code === 11000) {
                console.log(error);
                throw new UnauthorizedException("Duplicated key")
            }
        }
        return "Succefully created !"
    }
}