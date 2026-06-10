import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateMedicalReviewDto } from './dto/create-medical-review.dto';
import { MedicalReviewService } from './medical-review.service';

@Controller('hospital/reviews')
export class MedicalReviewController {
  constructor(private readonly medicalReviewService: MedicalReviewService) {}

  @Post()
  createReview(@Body() createMedicalReviewDto: CreateMedicalReviewDto) {
    return this.medicalReviewService.createReview(createMedicalReviewDto);
  }

  @Get(':packageId')
  getHospitalReviews(@Param('packageId') packageId: string) {
    return this.medicalReviewService.getHospitalReviews(packageId);
  }

  @Put(':id')
  updateReview(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateMedicalReviewDto>,
  ) {
    return this.medicalReviewService.updateReview(id, updateData);
  }

  @Delete(':id')
  deleteReview(@Param('id') id: string) {
    return this.medicalReviewService.deleteReview(id);
  }
}
