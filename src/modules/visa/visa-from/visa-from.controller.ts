import { Controller, Get, Query } from '@nestjs/common';
import { CreateVisaFromDto } from './dto/create-visa-from.dto';
// Import the actual service instead of the type/document
import { VisaFromService } from './visa-from.service';

@Controller('form-data')
export class VisaFromController {
  // Fix: Inject VisaFromService here
  constructor(private readonly formDataService: VisaFromService) {}

  // api will -> form-data/get-form-data?country=CountryName&visaType=VisaType
  @Get('get-form-data')
  async getFormData(@Query() query: CreateVisaFromDto) {
    return this.formDataService.getFormData(query);
  }


  // api will -> form-data/get-file-data?country=CountryName&visaType=VisaType
  @Get('get-file-data')
  async getFileData(@Query() query: CreateVisaFromDto) {
    return this.formDataService.getFileData(query);
  }
}
