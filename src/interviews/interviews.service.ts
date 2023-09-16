import { Injectable } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InterviewsService {
  constructor(private prisma: PrismaService) {}
  async create(createInterviewDto: CreateInterviewDto) {
    let link = Math.random().toString(36).slice(2);
    return await this.prisma.interviews.create({
      data: {
        ...createInterviewDto,
        link: link,
      },
    });
  }

  async addSlotsToInterview(id: number, slots) {
    return this.prisma.interviews.update({
      where: { 
        id: id 
      },
      data: {
        slots: {
          create: slots,
        },
      },
    });
  }

  async generateUniqueLink(){
    const uniqueLink = Math.random().toString(36).slice(2);
    return { link: uniqueLink };
  }

  async findAll() {
    return await this.prisma.interviews.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.interviews.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateInterviewDto: UpdateInterviewDto) {
    return await this.prisma.interviews.update({
      where: {
        id: id,
      },
      data: updateInterviewDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.interviews.delete({
      where: { id: id },
    });
  }
}
