import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CscaApplicationService } from './csca-applications.service';
import { CreateCscaApplicationDto } from './dto/create-csca-application.dto';

@Controller('csca-application/api/v1') // Base route: http://localhost:3000/form-data
export class CscaApplicationController {
  constructor(
    private readonly CscaApplicationService: CscaApplicationService,
  ) {}

  // POST Request: Data submit ba create korar jonno
  // api will be -> csca-application/api/v1/create
  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() CreateCscaApplicationDto: CreateCscaApplicationDto) {
    return this.CscaApplicationService.create(CreateCscaApplicationDto);
  }

  // GET Request: Sob submitted data eksathe dekhar jonno
  @Get()
  async findAll() {
    return this.CscaApplicationService.findAll();
  }

  // GET Request: Specific kono data ID diye khujer jonno
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.CscaApplicationService.findOne(id);
  }

  // DELETE Request: Kono data id dhore delete korar jonno
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.CscaApplicationService.remove(id);
  }
}
