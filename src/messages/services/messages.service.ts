import { Injectable } from '@nestjs/common';
import { MessagesRepository } from '../repository/messages.repository';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepo: MessagesRepository) {}
  async findOne(id: string) {
    return await this.messagesRepo.findOne(id);
  }
  async findAll() {
    return await this.messagesRepo.findAll();
  }
  async create(content: string) {
    return await this.messagesRepo.create(content);
  }
}
