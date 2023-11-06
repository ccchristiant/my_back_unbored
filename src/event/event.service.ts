import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../auth/schemas/user.schema';
import { Model, Types } from 'mongoose';
import { AddEventDto } from './dto/AddEvent.dto';
import { NotFoundException } from '@nestjs/common';
import { DeleteEventDto } from './dto/RemoveEvent.dto';
import { Events } from './schemas/events.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Events.name)
    private eventModel: Model<Events>,
  ) {}

  async showEvent(user: User) {
    return [user.reservations];
  }

  async addEvent(userId: string, addEvent: AddEventDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { reservations: { $each: addEvent.events } } },
      { new: true },
    );
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return [updatedUser.reservations];
  }

  async removeEvent(userId: string, deleteEvent: DeleteEventDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { reservations: { $in: deleteEvent.events } } },
      { new: true },
    );
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return [updatedUser.reservations];
  }

  async getEventById(eventId: string) {
    if (!Types.ObjectId.isValid(eventId)) {
      throw new NotFoundException('Invalid Id');
    }
    const event = await this.eventModel.findById(eventId);
    if (!event) {
      throw new NotFoundException('Invalid Id');
    }
    return event;
  }

  // async addUnboredEvent(role: string, ) {
  // try {
  // const event = await this.eventModel.create({

  // })
  // } catch(error) {
  // if (error.code === 11000) {
  // throw new ConflictException("Duplicated Key")
  // }
  // }
  // }
}
