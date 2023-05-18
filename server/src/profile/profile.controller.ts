import { Controller, Get, UseGuards, Req, Put, Body } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateDto } from './dto/update.dto';
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
}
