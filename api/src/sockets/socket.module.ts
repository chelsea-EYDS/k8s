import { Module } from '@nestjs/common';
import { SocketsGateway } from './socket.gateway';
import { SocketService } from './socket.service';


@Module({
  controllers: [],
  providers: [SocketsGateway, SocketService]
})
export class SocketsModule {}
