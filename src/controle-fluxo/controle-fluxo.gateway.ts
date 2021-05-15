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

// import { ControleFluxoDto } from './dto/controle-fluxo.dto';
// import { UpdateControleFluxoDto } from './dto/update-controle-fluxo.dto';

interface ISocketMessage {
  filialId: number;
  filialName: string;
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
  async handleIncrement(@MessageBody() data: ISocketMessage) {
    const { filialId, filialName, quantity } = data;

    const incrementedValue = await this.controleFluxoService.increment(
      quantity,
      filialId,
    );

    this.server.to(`room_${filialId}`).emit('msgToClient', {
      filialId: filialId,
      filialName: filialName,
      quantity: incrementedValue,
    });
  }

  @SubscribeMessage('msgDecrement')
  async handleDecrement(@MessageBody() data: ISocketMessage) {
    const { filialId, filialName, quantity } = data;

    const decrementedValue = await this.controleFluxoService.decrement(
      quantity,
      filialId,
    );

    this.server.emit('msgToClient', {
      filialId: filialId,
      filialName: filialName,
      quantity: decrementedValue,
    });
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: ISocketMessage,
    @ConnectedSocket() client: Socket,
  ) {
    const { filialId } = data;
    client.join(`room_${filialId}`);
    client.emit('joinedRoom', `room_${filialId}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() data: ISocketMessage,
    @ConnectedSocket() client: Socket,
  ) {
    const { filialId } = data;
    client.leave(`room_${filialId}`);
    client.emit('leavedRoom', `room_${filialId}`);
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
