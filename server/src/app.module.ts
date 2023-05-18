import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';
import { EventModule } from './event/event.module';


@Module({
  imports: [AuthModule, ProfileModule, MongooseModule.forRoot('mongodb://mongodb:27017/unbored'), EventModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
