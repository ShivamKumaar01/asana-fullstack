import { Controller, Get, Post, Body, Patch, Param, Delete,Res, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginUserDto } from './dto/login.dto';
import { Response } from 'express'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  async Login(@Body() createUserDto: loginUserDto ,@Res({ passthrough: true }) res: Response){
    // return this.userService.login(createUserDto);
     const tokenData = await this.userService.login(createUserDto)


    res.cookie('token', tokenData.details, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });

    return {
      message: 'Logged in successfully',
      name: tokenData.user.name,
      email: tokenData.user.email,
      token:tokenData.details
    };

  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Get()
  // findUserAndAdmin(
  //   @Query('') name?: string,
  //   @Query('minPrice') minPrice?: string,
  //   @Query('maxPrice') maxPrice?: string
  // ) {
  //   return this.userService.findAll({ name, minPrice, maxPrice });
  // }

  @Get('/alluser')
  findUser(){
    return this.userService.finduser()
  }

  @Get('/alladmin')
  findAdmin(){
    return this.userService.findadmin()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
