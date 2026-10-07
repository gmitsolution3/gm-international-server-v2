import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
  Min,
  MinLength,
  MaxLength,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum BatchStatus {
  UPCOMING = 'UPCOMING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class CreateBatchDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Batch name must be at least 3 characters' })
  @MaxLength(80, { message: 'Batch name is too long' })
  batchName: string;

  @Type(() => Number)
  @IsInt({ message: 'Must be a whole number' })
  @IsPositive({ message: 'Must be positive' })
  batchNumber: number;

  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters' })
  @MaxLength(500, { message: 'Description is too long' })
  description: string;

  @Type(() => Date)
  @IsDate({ message: 'Start date must be a valid date' })
  startDate: Date;

  @Type(() => Date)
  @IsDate({ message: 'End date must be a valid date' })
  endDate: Date;

  @IsEnum(BatchStatus, { message: 'Invalid batch status' })
  status: BatchStatus;

  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'At least 1 intern required' })
  @Max(1000, { message: 'Too many interns' })
  maxIntern: number;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
