import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
// import { GoogleStrategy } from './google.strategy';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'asydiaus8',
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    // GoogleStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
