import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../auth/schemas/user.schema";

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ){}
    async profile(user : User) {
        console.log(user);
        return
    }
}
