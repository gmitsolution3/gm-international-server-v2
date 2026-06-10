import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BusinessDealService } from './business-deal.service';
import { UpdateBusinessDealDto } from './dto/update-business-deal.dto';
import { CreateBusinessDealDto } from './dto/create-business-deal.dto';

@Controller('business-deal/api/v1')
export class BusinessDealController {
  constructor(private readonly businessDealService: BusinessDealService) {}

  // create deal
  // POST -> business-deal/api/v1/create
  @Post('create')
  create(@Body() body: any) {
    return this.businessDealService.createDeal(body);
  }

  // get all deals
  // GET -> business-deal/api/v1/get/all-deals
  @Get('get/all-deals')
  findAll() {
    return this.businessDealService.getAllDeals();
  }

  // get single deal
  // GET -> business-deal/api/v1/get/single-deal/:id
  @Get('get/single-deal/:id')
  findOne(@Param('id') id: string) {
    return this.businessDealService.getSingleDeal(id);
  }

  // update deal
  // PATCH -> business-deal/api/v1/update/:id
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body()
    updateBusinessDealDto: UpdateBusinessDealDto,
  ) {
    return this.businessDealService.updateDeal(id, updateBusinessDealDto);
  }

  // delete deal
  // DELETE -> business-deal/api/v1/delete/:id
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.businessDealService.deleteDeal(id);
  }
}
