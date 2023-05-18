import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/auth/schemas/user.schema';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])],
  providers: [EventService, JwtStrategy],
  controllers: [EventController]
})

export class EventModule {}
