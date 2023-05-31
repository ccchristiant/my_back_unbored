import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../auth/schemas/user.schema";
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ){}
    async profile(user : User) {
        const profileUser = {
            "id": user.id,
            "username" : user.username,
            "number" : user.number,
            "email" : user.email,
            "gender" : user.gender,
            "birthdate": user.birthdate,
            "preferences": user.preferences,
            "reservations": user.reservations,
        }
        return profileUser;
    }

    async UpdateUser(id: string, updateUser : UpdateDto) {
        if (updateUser.role) {
            throw new UnauthorizedException('Role is cannot be modifiyed')
        }
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUser, {new: true});
        if (!updatedUser) {
            throw new NotFoundException('User not found');
        }
        return updatedUser;
    }
}
