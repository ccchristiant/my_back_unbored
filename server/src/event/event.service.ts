import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../auth/schemas/user.schema';
import { Model } from 'mongoose';
import { AddEventDto } from './dto/AddEvent.dto';
import { NotFoundException } from '@nestjs/common';
import { DeleteEventDto } from './dto/RemoveEvent.dto';

@Injectable()
export class EventService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ){}

    async showEvent(user : User) {
        return [user.reservations];
        
    }

    async addEvent(userId : string, addEvent : AddEventDto) {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, { $addToSet : { reservations: { $each: addEvent.events }}}, {new: true})
        if (!updatedUser) {
            throw new NotFoundException('User not found');
        }
        return [updatedUser.reservations];
    }

    async removeEvent(userId : string, deleteEvent : DeleteEventDto) {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, { $pull : {reservations: {$in: deleteEvent.events}}}, {new: true});
        if (!updatedUser) {
            throw new NotFoundException('User not found');
        }
        return [updatedUser.reservations];
    }
}
