import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages: {[key: string]: Message[] } = {
    "1992": [],
    "1991": []
  };
  clientToUsers = {};

  identify(name: string, clientId: string) {
    this.clientToUsers[clientId] = name;

    return Object.values(this.clientToUsers);
  }

  getClientName(clientId: string) {
    return this.clientToUsers[clientId];
  }
  
  create(createMessageDto: CreateMessageDto) {
    const message = {
      name: createMessageDto.name,
      text: createMessageDto.text,
      room: createMessageDto.room
    }
    this.messages[message.room].push(message); 
    return message;
  }

  findAll() {
    return this.messages;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
