import { interviews } from "@prisma/client";

export class CreateSlotDto {
    startTime: Date;
    endTime: Date;
    isBooked: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    interviewId: number;
}
