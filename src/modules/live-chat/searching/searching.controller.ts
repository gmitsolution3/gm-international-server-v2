// searching/searching.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { CreateSearchingDto } from './dto/create-searching.dto';
import { SearchService } from './searching.service';

@Controller('/api/v1/search')
export class SearchingController {
  constructor(private readonly searchingService: SearchService) {}

  @Post()
  search(@Body() dto: CreateSearchingDto) {
    return this.searchingService.search(dto);
  }
}
