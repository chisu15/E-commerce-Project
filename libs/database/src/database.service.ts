import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
    constructor(private configService: ConfigService) {}

    getDatabaseUrl() {
      return this.configService.get<string>(process.env.MONGODB_URL);
    }
}
