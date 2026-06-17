// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { BusinessAccountService } from './business-account.service';
// import { CreateBusinessAccountDto } from './dto/create-business-account.dto';
// import { UpdateBusinessAccountDto } from './dto/update-business-account.dto';

// @Controller('business-account')
// export class BusinessAccountController {
//   constructor(private readonly businessAccountService: BusinessAccountService) {}

//   @Post()
//   create(@Body() createBusinessAccountDto: CreateBusinessAccountDto) {
//     return this.businessAccountService.create(createBusinessAccountDto);
//   }

//   @Get()
//   findAll() {
//     return this.businessAccountService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.businessAccountService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateBusinessAccountDto: UpdateBusinessAccountDto) {
//     return this.businessAccountService.update(+id, updateBusinessAccountDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.businessAccountService.remove(+id);
//   }
// }

import { Controller, Post, Get, Put, Body, Query, Param } from '@nestjs/common';
import { BusinessAccountService } from './business-account.service';
import { CreateBusinessAccountDto } from './dto/create-business-account.dto';

@Controller('business-application/api/v1')
export class BusinessAccountController {
  constructor(
    private readonly businessAccountService: BusinessAccountService,
  ) {}

  // POST Route -> /business-application/api/v1/accounts/business-application
  @Post('accounts/business-application')
  async create(@Body() createBusinessAccountDto: CreateBusinessAccountDto) {
    return this.businessAccountService.create(createBusinessAccountDto);
  }

  // GET Route -> /business-application/api/v1/account/business-application?email=...
  @Get('account/business-application')
  async getAccounts(@Query('email') email: string) {
    return this.businessAccountService.getAccounts(email);
  }

  // PUT Route -> /business-application/api/v1/accounts/bap-update/:id
  @Put('accounts/bap-update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateBusinessAccountDto>,
  ) {
    return this.businessAccountService.update(id, updateData);
  }
}
