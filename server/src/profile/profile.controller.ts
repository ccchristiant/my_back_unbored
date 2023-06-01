import { Controller, Get, UseGuards, Req, Put, Body, Post } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateDto } from './dto/update.dto';
import { UpdateAvatarDto } from './dto/updateAvatar.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService) {}

    @UseGuards(JwtGuard)
    @Get('/')
    async profile(@Req() req) {
        return this.profileService.profile(req.user);
    }

    @UseGuards(JwtGuard)
    @Put('/update')
    async update(@Req() req, @Body() updateUser : UpdateDto) {
        return this.profileService.UpdateUser(req.user.id, updateUser);
    }

    @UseGuards(JwtGuard)
    @Get('/avatar')
    async avatar(@Req() req) {
        return this.profileService.UserActualAvatar(req.user);
    }

    @UseGuards(JwtGuard)
    @Get('/avatars')
    async avatars(@Req() req) {
        return this.profileService.UserAvatars(req.user);
    }

    @UseGuards(JwtGuard)
    @Post('/avatar')
    async changeAvatar(@Req() req, @Body() updateAvatarDto : UpdateAvatarDto) {
        return this.profileService.ChangeAvatar(req.user.id, updateAvatarDto);
    }
}
