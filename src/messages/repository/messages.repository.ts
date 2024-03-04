import { Injectable } from '@nestjs/common/decorators';
import { readFile, writeFile } from 'fs/promises';

interface Repository {
  findAll();
  findOne(id: string);
  create(content: string);
}
@Injectable()
export class MessagesRepository implements Repository {
  private readonly storePath = 'messages.json';
  private async readStore(): Promise<string> {
    try {
      return await readFile(this.storePath, 'utf8');
    } catch {
      await writeFile(this.storePath, JSON.stringify({}));
      return await readFile(this.storePath, 'utf8');
    }
  }
  private async writeStore(json): Promise<void> {
    await writeFile(this.storePath, JSON.stringify(json));
  }
  async findOne(id: string) {
    const store = await readFile(this.storePath, 'utf8');
    const messages = JSON.parse(store);
    return messages[id];
  }
  async findAll() {
    const store = await this.readStore();
    const messages = JSON.parse(store);
    return messages;
  }
  async create(content: string) {
    const store = await this.readStore();
    const messages = JSON.parse(store);
    const id = Math.floor(Math.random() * 999);
    messages[id] = { id, content };
    await this.writeStore(messages);
  }
}
