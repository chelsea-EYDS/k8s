import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('app')
// @ApiOAuth2(['openid'])
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get()
  // @UseGuards(GoogleAuthGuard)
  // async login(@Req() req) {
  // }

  @Get('/login')
  // @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const token = await this.authService.authenticate(req.user.accessToken);
    res.headers.set('Authorization', token.access_token);
    return {
      HttpCode: 200,
      Message: 'Login Success',
      token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/private')
  async getPrivateRoute(@Req() req) {
    return {
      HttpCode: 200,
      Message: 'Private Route Accessed by ' + req.user.email,
    };
  }
}
