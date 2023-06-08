import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto): Promise<string> {
    const {
      username,
      email,
      password,
      gender,
      number,
      birthdate,
      preferences,
    } = registerDto;
    const hash = await bcrypt.hash(password, 10);
    try {
      const user = await this.userModel.create({
        username,
        email,
        gender,
        role: Role.USER,
        birthdate,
        number,
        password: hash,
        preferences: preferences,
        actualB: '0',
        actualH: '0',
        actualP: '0',
        actualS: '0',
        body: '0',
        shoes: '0',
        pants: '0',
        head: '0',
      });
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Duplicated key');
      }
    }
    return 'Succefully created !';
  }

  async login(loginDto: LoginDto): Promise<{ token: string; refresh: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log(user);
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign({ id: user._id, role: user.role });
    const refreshToken = this.jwtService.sign(
      { id: user._id, role: user.role },
      { expiresIn: '90d', secret: 'caca' },
    );
    return { token: token, refresh: refreshToken };
  }

  async refresh(
    user: User,
    actualRefresh: string,
  ): Promise<{ token: string; refresh: string }> {
    return {
      token: this.jwtService.sign({ id: user._id }),
      refresh: actualRefresh,
    };
  }
}
