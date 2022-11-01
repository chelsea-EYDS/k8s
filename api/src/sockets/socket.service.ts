import { Injectable } from '@nestjs/common';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  async getUserFromSocket(socket: Socket) {
    const {headers} = socket.handshake;
    
    const user = {
      username: headers['x-forwarded-user'],
      email: headers['x-forwarded-email'],
      auth: !!headers['x-forwarded-access-token'],
    }

    return user;
  }
}
