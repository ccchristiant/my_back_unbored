import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import { UpdateDto } from './dto/update.dto';
import { UpdateAvatarDto } from './dto/updateAvatar.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}
  async profile(user: User) {
    const profileUser = {
      id: user.id,
      username: user.username,
      number: user.number,
      email: user.email,
      gender: user.gender,
      birthdate: user.birthdate,
      preferences: user.preferences,
      reservations: user.reservations,
    };
    return profileUser;
  }

  async UpdateUser(id: string, updateUser: UpdateDto) {
    if (updateUser.role) {
      throw new UnauthorizedException('Role is cannot be modified');
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUser, {
      new: true,
    });
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async UserActualAvatar(user: User) {
    return {
      head: user.actualH,
      body: user.actualB,
      pants: user.actualP,
      shoes: user.actualS,
    };
  }

  async UserAvatars(user: User) {
    return {
      head: user.head,
      body: user.body,
      pants: user.pants,
      shoes: user.shoes,
    };
  }

  async ChangeAvatar(id: string, updateAvatarDto: UpdateAvatarDto) {
    const avatarUpdate = await this.userModel.findByIdAndUpdate(
      id,
      updateAvatarDto,
      { new: true },
    );
    if (!avatarUpdate) {
      throw new NotFoundException('User not found');
    }
    return {
      head: avatarUpdate.actualH,
      body: avatarUpdate.actualB,
      pants: avatarUpdate.actualP,
      shoes: avatarUpdate.actualS,
    };
  }
}
