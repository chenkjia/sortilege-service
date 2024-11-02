import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: User) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
  // findOne(@Body() user: User) {
  //   // 现在返回的是status201,如果改成status400
  //   return this.userService.findOne(user)
  // }


  @Post('findOne')
  async findOne(@Res() res: Response, @Body() user: User) {
    console.log(user)
    const resultUser = await this.userService.findOne(user);
    console.log(resultUser)
    if (resultUser) {
      res.status(HttpStatus.OK).json(resultUser);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
      });
    }
  }
  
  @Post('login')
  login(@Body() user: User) {
    return this.userService.login(user);
  }

  @Post('getUserInfo')
  async getUserInfo(@Res() res: Response, @Body() sessions) {
    // 获取抖音的openId和token，
    // 通过code调用抖音API,获取用户openId
    // 在数据查找该用户openId对应的用户信息，如果有，则返回用户信息，如果没有，则只返回用户openId
    const openId = await this.userService.getOpenId(sessions);
    const resultUser = await this.userService.findOne({openId: openId});
    if (resultUser) {
      res.status(HttpStatus.OK).json(resultUser);
    } else {
      res.status(HttpStatus.OK).json({
          code: 100001,
          message: 'User not found',
          openId: openId
      });
    }
  }
}
