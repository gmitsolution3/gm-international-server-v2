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
import { StdAccountService } from './std-account.service';
import { CreateStdAccountDto } from './dto/create-std-account.dto';
import { UpdateStdAccountDto } from './dto/update-std-account.dto';

@Controller('std-account/api/v1')
export class StdAccountController {
  constructor(private readonly stdAccountService: StdAccountService) {}

  // api will be -> std-account/api/v1/create
  @Post('create')
  create(@Body() createStdAccountDto: CreateStdAccountDto) {
    console.log({ createStdAccountDto });
    return this.stdAccountService.create(createStdAccountDto);
  }

  // api will be -> std-account/api/v1/sap
  @Get('sap')
  async getAccounts(@Query('email') email: string) {
    return this.stdAccountService.getAccounts(email);
  }

  // api will be -> std-account/api/v1/sap-upd/:id
  @Put('sap-upd/:id')
  update(
    @Param('id') id: string,
    @Body() updateStdAccountDto: UpdateStdAccountDto,
  ) {
    return this.stdAccountService.update(id, updateStdAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stdAccountService.remove(id);
  }

  // analysis
  // api will be -> std-account/api/v1/analysis-document
  @Get('analysis-document')
  async getAnalysis(@Query('email') email: string) {
    return this.stdAccountService.getAccountAnalysis(email);
  }
}
