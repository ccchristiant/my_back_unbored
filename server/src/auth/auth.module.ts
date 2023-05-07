import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './schemas/user.schema';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.registerAsync({
            useFactory: () => {
                return {
                    secret: "caca",
                    signOptions: {
                        expiresIn: "3d"
                    },
                };
            }
        }),
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})

export class AuthModule {}