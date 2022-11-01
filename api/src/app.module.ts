import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { SocketsModule } from './sockets/socket.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    LoggerModule,
    TypeOrmModule.forFeature([User]),
    SocketsModule
  ],
})
export class AppModule {}
