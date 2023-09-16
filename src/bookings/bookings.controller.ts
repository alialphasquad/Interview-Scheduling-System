import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('/candidates/slots')
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':slotId/candidateId')
  findOne(@Param('slotId') slotId: number, @Param('candidateId') candidateId: number) {
    return this.bookingsService.findOne(slotId,candidateId);
  }

  @Patch(':slotId')
  update(@Param('slotId') slotId: number, @Param('candidateId') candidateId: number, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(slotId, candidateId, updateBookingDto);
  }

  @Delete(':slotId')
  remove(@Param('slotId') slotId: number, @Param('candidateId') candidateId: number) {
    return this.bookingsService.remove(slotId, candidateId);
  }
}
