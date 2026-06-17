import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { MedAccountService } from './med-account.service';
import { CreateMedAccountDto } from './dto/create-med-account.dto';
import { UpdateMedAccountDto } from './dto/update-med-account.dto';

@Controller('med-account/api/v1')
export class MedAccountController {
  constructor(private readonly medAccountService: MedAccountService) {}

  // api will be -> med-account/api/v1/med
  @Post('med')
  async create(@Body() createMedAccountDto: CreateMedAccountDto) {
    return this.medAccountService.create(createMedAccountDto);
  }

  // api will be -> med-account/api/v1/get-med
  @Get('get-med')
  async getAccounts(@Query('email') email: string) {
    return this.medAccountService.getAccounts(email);
  }

  // api will be -> med-account/api/v1/med-upd/:id
  @Put('med-upd/:id')
  async update(
    @Param('id') id: string,
    @Body() updateData: UpdateMedAccountDto,
  ) {
    return this.medAccountService.update(id, updateData);
  }
}
