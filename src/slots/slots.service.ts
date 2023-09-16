import { Injectable } from '@nestjs/common';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SlotsService {
  constructor(private prisma: PrismaService) {}
  async create(createSlotDto: CreateSlotDto) {
    return await this.prisma.slots.create({
      data: {
        endTime: createSlotDto.endTime,
        startTime: createSlotDto.startTime,
        isBooked: createSlotDto.isBooked,
        interviewId: createSlotDto.interviewId,
      },
    });
  }

  async findAll() {
    return await this.prisma.slots.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.slots.findUnique({
      where:{
        id:id
      }
    });
  }

  async update(id: number, updateSlotDto: UpdateSlotDto) {
    return await this.prisma.slots.update({
      where:{
        id:id
      },
      data:{
        endTime: updateSlotDto.endTime,
        startTime: updateSlotDto.startTime,
        isBooked: updateSlotDto.isBooked,
        interviewId: updateSlotDto.interviewId,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.slots.delete({
      where:{
        id:id
      }
    });
  }
}
