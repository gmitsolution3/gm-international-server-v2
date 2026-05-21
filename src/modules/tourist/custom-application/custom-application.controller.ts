import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TouristQueryService } from './custom-application.service';
import { CreateTouristQueryDto } from './dto/create-custom-application.dto';
import { UpdateCustomApplicationDto } from './dto/update-custom-application.dto';


@Controller('tourist-query/api/v1')
export class TouristQueryController {
  constructor(private readonly touristQueryService: TouristQueryService) {}

  // create query
  // POST -> tourist-query/api/v1/create
  @Post('create')
  create(
    @Body()
    createTouristQueryDto: CreateTouristQueryDto,
  ) {
    return this.touristQueryService.createQuery(createTouristQueryDto);
  }

  // get all queries
  // GET -> tourist-query/api/v1/get/all-queries
  @Get('get/all-queries')
  findAll() {
    return this.touristQueryService.getAllQueries();
  }

  // get single query
  // GET -> tourist-query/api/v1/get/single-query/:id
  @Get('get/single-query/:id')
  findOne(@Param('id') id: string) {
    return this.touristQueryService.getSingleQuery(id);
  }

  // update query
  // PATCH -> tourist-query/api/v1/update/:id
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body()
    updateTouristQueryDto: UpdateCustomApplicationDto,
  ) {
    return this.touristQueryService.updateQuery(id, updateTouristQueryDto);
  }

  // delete query
  // DELETE -> tourist-query/api/v1/delete/:id
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.touristQueryService.deleteQuery(id);
  }
}
