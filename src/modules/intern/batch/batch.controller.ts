import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateBatchDto } from './dto/create-batch.dto';
import { InternBatchService } from './batch.service';

@Controller('api/v1/intern/batch')
export class InternBatchController {
  // Injecting the InternBatchService into the controller constructor
  constructor(private readonly internBatchService: InternBatchService) {}

  // api will be-> api/v1/intern/batch/create
  @Post('create')
  async createBatch(@Body() createBatchDto: CreateBatchDto) {
    return await this.internBatchService.create(createBatchDto);
  }

  // api will be -> api/v1/intern/batch/get-all-batch
  @Get('get-all-batch')
  async getAllBatches() {
    return await this.internBatchService.findAll();
  }

  // api will be -> api/v1/intern/batch/get-batch-details/:id
  @Get('get-batch-details/:id')
  async getBatchDetails(@Param('id') id: string) {
    return await this.internBatchService.findOne(id);
  }

  @Patch('upd-batch/:id')
  async updateBatch(
    @Param('id') id: string,
    @Body() updateBatchDto: Partial<CreateBatchDto>,
  ) {
    return await this.internBatchService.update(id, updateBatchDto);
  }

  // api will be -> api/v1/intern/batch/del-batch/:id
  @Delete('del-batch/:id')
  async deleteBatch(@Param('id') id: string) {
    return await this.internBatchService.remove(id);
  }
}
