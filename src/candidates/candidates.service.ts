import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CandidatesService {
  constructor(private prisma:PrismaService){}
  async create(createCandidateDto: CreateCandidateDto) {
    return await this.prisma.candidates.create({
      data:createCandidateDto
    });
  }

  async findAll() {
    return await this.prisma.candidates.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.candidates.findUnique({
      where:{
        id:id
      }
    });
  }

  async update(id: number, updateCandidateDto: UpdateCandidateDto) {
    return await this.prisma.candidates.update({
      where:{
        id:id
      },
      data:updateCandidateDto
    });
  }

  async remove(id: number) {
    return await this.prisma.candidates.delete({
      where:{
        id:id
      }
    });
  }
}
