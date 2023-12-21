import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from '../services/messages.service';
import { CreateMessageDto } from '../dto/create-message.dto';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ChatGateway');

  constructor(private readonly messagesService: MessagesService) {}
  
  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messagesService.create(createMessageDto);
    
    this.server.to(createMessageDto.room).emit("message", message);
    
    return message;
  }

  @SubscribeMessage('takeMessages')
  async findAll(@MessageBody() {room_id, row}) {
    return await this.messagesService.findAll({ room_id, row });
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string, 
    @ConnectedSocket() client: Socket
    ) {
    return this.messagesService.identify(name, client.id);
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string ) {
    client.join(room);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket
    ) {
    client.broadcast.emit('typing', {name: isTyping});
  }

  // @SubscribeMessage('updateMessage')
  // update(@MessageBody() updateMessageDto: UpdateMessageDto) {
  //   return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  // }

  // @SubscribeMessage('removeMessage')
  // remove(@MessageBody() id: number) {
  //   return this.messagesService.remove(id);
  // }
}
