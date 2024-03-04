import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from '../dtos/create-message.dto';
import { MessagesService } from '../services/messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  @Post()
  async create(@Body() body: CreateMessageDto) {
    return await this.messagesService.create(body.content);
  }
  @Get()
  async findAll() {
    return await this.messagesService.findAll();
  }
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);
    if (!message) {
      throw new NotFoundException('message not found');
    }
    return message;
  }
}
