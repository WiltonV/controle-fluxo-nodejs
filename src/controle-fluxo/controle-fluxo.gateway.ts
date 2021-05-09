import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ControleFluxoService } from './controle-fluxo.service';
import { Server, Socket } from 'socket.io';

// import { CreateControleFluxoDto } from './dto/create-controle-fluxo.dto';
// import { UpdateControleFluxoDto } from './dto/update-controle-fluxo.dto';

interface ISocketMessage {
  roomId: number;
  roomName: string;
  quantity: number;
}

@WebSocketGateway()
export class ControleFluxoGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');
  constructor(private readonly controleFluxoService: ControleFluxoService) {}

  @SubscribeMessage('msgIncrement')
  handleIncrement(@MessageBody() data: ISocketMessage) {
    const { roomId, roomName, quantity } = data;
    this.server.emit('msgToClient', {
      roomId: roomId,
      roomName: roomName,
      quantity: this.controleFluxoService.increment(quantity),
    });
  }

  @SubscribeMessage('msgDecrement')
  handleDecrement(@MessageBody() data: ISocketMessage) {
    const { roomId, roomName, quantity } = data;
    this.server.emit('msgToClient', {
      roomId: roomId,
      roomName: roomName,
      quantity: this.controleFluxoService.decrement(quantity),
    });
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: ISocketMessage,
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId } = data;
    client.join(`${roomId}`);
    client.emit('joinedRoom', roomId);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() data: ISocketMessage,
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId } = data;
    client.leave(`${roomId}`);
    client.emit('leavedRoom', roomId);
  }

  afterInit() {
    this.logger.log(`Init`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // @SubscribeMessage('createControleFluxo')
  // create(@MessageBody() createControleFluxoDto: CreateControleFluxoDto) {
  //   return this.controleFluxoService.create(createControleFluxoDto);
  // }

  // @SubscribeMessage('findAllControleFluxo')
  // findAll() {
  //   return this.controleFluxoService.findAll();
  // }

  // @SubscribeMessage('findOneControleFluxo')
  // findOne(@MessageBody() id: number) {
  //   return this.controleFluxoService.findOne(id);
  // }

  // @SubscribeMessage('updateControleFluxo')
  // update(@MessageBody() updateControleFluxoDto: UpdateControleFluxoDto) {
  //   return this.controleFluxoService.update(
  //     updateControleFluxoDto.id,
  //     updateControleFluxoDto,
  //   );
  // }

  // @SubscribeMessage('removeControleFluxo')
  // remove(@MessageBody() id: number) {
  //   return this.controleFluxoService.remove(id);
  // }
}
