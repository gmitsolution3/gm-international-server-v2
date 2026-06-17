// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { TouristAccountService } from './tourist-account.service';
// import { CreateTouristAccountDto } from './dto/create-tourist-account.dto';
// import { UpdateTouristAccountDto } from './dto/update-tourist-account.dto';

// @Controller('tourist-account')
// export class TouristAccountController {
//   constructor(private readonly touristAccountService: TouristAccountService) {}

//   @Post()
//   create(@Body() createTouristAccountDto: CreateTouristAccountDto) {
//     return this.touristAccountService.create(createTouristAccountDto);
//   }

//   @Get()
//   findAll() {
//     return this.touristAccountService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.touristAccountService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateTouristAccountDto: UpdateTouristAccountDto) {
//     return this.touristAccountService.update(+id, updateTouristAccountDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.touristAccountService.remove(+id);
//   }
// }

import { Controller, Post, Get, Put, Body, Query, Param } from '@nestjs/common';
import { TouristAccountService } from './tourist-account.service';
import { CreateTouristAccountDto } from './dto/create-tourist-account.dto';

@Controller('account-tourist/api/v1')
export class TouristAccountController {
  constructor(private readonly touristAccountService: TouristAccountService) {}

  // POST Route -> /account-tourist/api/v1/accounts/tourist-application
  @Post('accounts/tourist-application')
  async create(@Body() createTouristAccountDto: CreateTouristAccountDto) {
    return this.touristAccountService.create(createTouristAccountDto);
  }

  // GET Route -> /account-tourist/api/v1/account/tourist-application?email=...
  @Get('account/tourist-application')
  async getAccounts(@Query('email') email: string) {
    return this.touristAccountService.getAccounts(email);
  }

  // PUT Route -> /account-tourist/api/v1/accounts/tap-update/:id
  @Put('accounts/tap-update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateTouristAccountDto>,
  ) {
    return this.touristAccountService.update(id, updateData);
  }
}
