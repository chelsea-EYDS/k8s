import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Response,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';

// @UseGuards(JwtAuthGuard)
@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/current')
  async getLoggedInUser(@Request() req, @Response() res){
    console.log(req.headers);
    
    const user = {
      username: req.headers['x-forwarded-user'],
      email: req.headers['x-forwarded-email'],
      auth: !!req.headers['x-forwarded-access-token'],
    }
    
    // await this.userService.createUser({username: user.username, email: user.email})
    res.send(user);

    // return this.userService.getUsers();
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<User> {
    return this.userService.getOne(id);
  }

  @Post()
  async createTest(@Body() createUserDTO: CreateUserDTO): Promise<unknown> {
    return this.userService.createUser(createUserDTO);
  }

  @Patch(':id')
  async updateUser(
    @Body() updateUserDTO: UpdateUserDTO,
    @Param('id') id: number,
  ): Promise<unknown> {
    return this.userService.updateUser(id, updateUserDTO);
  }
}
