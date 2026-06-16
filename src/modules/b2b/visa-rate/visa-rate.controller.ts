import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VisaRateService } from './visa-rate.service';
import { CreateVisaRateDto } from './dto/create-visa-rate.dto';
import { UpdateVisaRateDto } from './dto/update-visa-rate.dto';

@Controller('visa-rate/api/v1')
export class VisaRateController {
  constructor(private readonly VisaRateService: VisaRateService) {}

  // POST: http://localhost:8080/visa-rate/api/v1/create
  @Post('create')
  create(@Body() createVisaPackageDto: CreateVisaRateDto) {
    return this.VisaRateService.create(createVisaPackageDto);
  }

  // GET: http://localhost:8080/visa-rate/api/v1/get-all
  @Get('get-all')
  findAll() {
    return this.VisaRateService.findAll();
  }

  // GET (Single): http://localhost:8080/visa-rate/api/v1/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.VisaRateService.findOne(id);
  }

  // PATCH (Update): http://localhost:8080/visa-rate/api/v1/:id
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVisaPackageDto: UpdateVisaRateDto,
  ) {
    return this.VisaRateService.update(id, updateVisaPackageDto);
  }

  // DELETE: http://localhost:8080/visa-rate/api/v1/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.VisaRateService.remove(id);
  }
}
