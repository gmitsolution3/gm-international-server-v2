import { Injectable } from '@nestjs/common';
import { CreateB2bUserDto } from './dto/create-b2b_user.dto';
import { UpdateB2bUserDto } from './dto/update-b2b_user.dto';

@Injectable()
export class B2bUserService {
  create(createB2bUserDto: CreateB2bUserDto) {
    return 'This action adds a new b2bUser';
  }

  findAll() {
    return `This action returns all b2bUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} b2bUser`;
  }

  update(id: number, updateB2bUserDto: UpdateB2bUserDto) {
    return `This action updates a #${id} b2bUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} b2bUser`;
  }
}
