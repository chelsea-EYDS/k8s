import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  ConnectedSocket,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Socket, Server } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketsGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly socketService: SocketService) {}

  // async handleConnection(socket: Socket) {
  //   await this.socketService.getUserFromSocket(socket);

  // }

  @SubscribeMessage('chat message')
  async chat(@ConnectedSocket() socket: Socket, @MessageBody() msg: string) {
    const user = await this.socketService.getUserFromSocket(socket);
    this.server.emit('emit chat message', `${user.username}: ${msg}`);
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log(this.server);
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('identity')
  async identity(@ConnectedSocket() socket: Socket): Promise<any> {
    console.log('identity');
    const user = await this.socketService.getUserFromSocket(socket);
    this.server.emit('emit user joined', `${user.username} has joined`);
  }
}
