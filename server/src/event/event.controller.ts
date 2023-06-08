import {
  Controller,
  UseGuards,
  Post,
  Req,
  Body,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddEventDto } from './dto/AddEvent.dto';
import { DeleteEventDto } from './dto/RemoveEvent.dto';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @UseGuards(JwtGuard)
  @Get('/')
  async showEvent(@Req() req) {
    return this.eventService.showEvent(req.user);
  }

  @UseGuards(JwtGuard)
  @Post('/add')
  async addEvent(@Req() req, @Body() addEventDto: AddEventDto) {
    return this.eventService.addEvent(req.user.id, addEventDto);
  }

  @UseGuards(JwtGuard)
  @Delete('/delete')
  async deleteEvent(@Req() req, @Body() deleteEventDto: DeleteEventDto) {
    return this.eventService.removeEvent(req.user.id, deleteEventDto);
  }

  @UseGuards(JwtGuard)
  @Get('/show')
  async showDetails(@Query('id') id) {
    return this.eventService.getEventById(id);
  }

  // @UseGuards(JwtGuard)
  // @Post('/addUnboredEvent')
  // async addUnboredEvent() {
  //     return null;
  // }
}
