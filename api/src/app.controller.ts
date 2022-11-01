import { Post, Controller, Get, Body, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Logger } from './logger/logger.service';
import { UserService } from './user/user.service';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private logger: Logger, private userService: UserService) {
    this.logger.setContext('App Controller');
  }

  @Get()
  hello() {
    return {
      data: null,
      message: 'Hello',
    };
  }

  @Get('health')
  health() {
    return {
      data: null,
      message: 'App Is Running',
    };
  }

  @Get('oauth2/auth')
  async auth(@Query() query: string) {
    console.log(query);
  }

  @Post('/message')
  async post(@Body() body) {
    await this.userService.createUser(body);
    return {
      data: body.email,
      message: 'Thanks, ',
    };
  }
}
