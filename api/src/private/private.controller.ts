import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrivateService } from './private.service';

@ApiTags('private')
@Controller('privates')
export class PrivateController {
  constructor(private readonly privateService: PrivateService) {}
  @Get()
  async getPrivateRoute() {
    return this.privateService.getPrivateRoute();
  }
}
