import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, UpdateUserRoleDto } from './dto/update-user.dto';

// get-> localhost:8080/user/user-role
// get-> localhost:8080/user/get-profile-info
// get-> localhost:8080/user/user/get-avatar
// put-> localhost:8080/user/update-profile/:id
// patch-> localhost:8080/user/updated-role/:id
// del-> localhost:8080//user/delete//:id

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get-> /user/user-role
  @Get('user-role')
  getUserRole(@Query('email') email: string) {
    return this.userService.getUserRole(email);
  }
  @Get('get-all-users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  // get-> user/get-employ
  @Get('get-employ')
  getEmploy() {
    return this.userService.getEmploy();
  }

  // get -> /user/get-profile-info
  @Get('get-profile-info')
  getProfileInfo(@Query('email') email: string) {
    return this.userService.getProfileInfo(email);
  }

  // get -> /user/get-avatar
  @Get('get-avatar')
  getAvatar(@Query('email') email: string) {
    return this.userService.getAvatar(email);
  }

  // update-> /user/update-profile/:id
  @Put('updated-profile/:id')
  updateProfile(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateProfile(id, updateUserDto);
  }

  // patch-> /user/updated-role/:id
  @Patch('updated-role/:id')
  updateUserRole(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.userService.updateUserRole(id, updateUserRoleDto);
  }

  // delete-> /user/delete/:id
  @Delete('delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
