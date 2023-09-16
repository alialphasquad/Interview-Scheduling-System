import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService){}
  async create(createBookingDto: CreateBookingDto) {
    return await this.prisma.bookings.create({
      data:createBookingDto
    }) ;
  }

  async findAll() {
    return await this.prisma.bookings.findMany();
  }

  async findOne(slotId: number, candidateId: number,) {
    return await this.prisma.bookings.findUnique({
      where:{
        slotId_candidateId:{slotId,candidateId}
      }
    });
  }

  async update(slotId: number, candidateId: number, updateBookingDto: UpdateBookingDto) {
    return await this.prisma.bookings.update({
      where:{
        slotId_candidateId:{slotId,candidateId}
      },
      data:updateBookingDto
    });
  }

  async remove(slotId: number, candidateId: number,) {
    return await this.prisma.bookings.delete({
      where:{
        slotId_candidateId:{slotId,candidateId}
      }
    });
  }
}
