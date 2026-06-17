// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { VisaAccountService } from './visa-account.service';
// import { CreateVisaAccountDto } from './dto/create-visa-account.dto';
// import { UpdateVisaAccountDto } from './dto/update-visa-account.dto';

// @Controller('visa-account')
// export class VisaAccountController {
//   constructor(private readonly visaAccountService: VisaAccountService) {}

//   @Post()
//   create(@Body() createVisaAccountDto: CreateVisaAccountDto) {
//     return this.visaAccountService.create(createVisaAccountDto);
//   }

//   @Get()
//   findAll() {
//     return this.visaAccountService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.visaAccountService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateVisaAccountDto: UpdateVisaAccountDto) {
//     return this.visaAccountService.update(+id, updateVisaAccountDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.visaAccountService.remove(+id);
//   }
// }

import { Controller, Post, Get, Put, Body, Query, Param } from '@nestjs/common';
import { VisaAccountService } from './visa-account.service';
import { CreateVisaAccountDto } from './dto/create-visa-account.dto';

@Controller('acc-business/api/v1')
export class VisaAccountController {
  constructor(private readonly visaAccountService: VisaAccountService) {}

  // POST Route -> /acc-business/api/v1/accounts/visa-application
  @Post('accounts/visa-application')
  async create(@Body() createVisaAccountDto: CreateVisaAccountDto) {
    return this.visaAccountService.create(createVisaAccountDto);
  }

  // GET Route -> /acc-business/api/v1/account/visa-application?email=...
  @Get('account/visa-application')
  async getAccounts(@Query('email') email: string) {
    return this.visaAccountService.getAccounts(email);
  }

  // PUT Route -> /acc-business/api/v1/accounts/vap-update/:id
  @Put('accounts/vap-update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateVisaAccountDto>,
  ) {
    return this.visaAccountService.update(id, updateData);
  }
}