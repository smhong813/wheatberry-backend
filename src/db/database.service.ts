import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DatabaseConfig } from 'src/config/database.config';
import { AUTH_DB } from './database.constants';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  private readonly connectionName = AUTH_DB;
  private readonly dbConfig: DatabaseConfig;

  constructor(private readonly configService: ConfigService) {
    const dbConfig = this.configService.get<DatabaseConfig>('database');
    if (!dbConfig) {
      throw new Error(`Settings for authDB don't meet the requirements`);
    }
    this.dbConfig = dbConfig;
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: this.connectionName,
      type: 'postgres',
      host: this.dbConfig.host,
      port: this.dbConfig.port,
      username: this.dbConfig.username,
      password: this.dbConfig.password,
      database: this.dbConfig.database,
      entities: [],
      ssl: String(this.dbConfig.ssl) === 'false' ? false : true,
      autoLoadEntities: true,
      migrations: ['dist/db/migrations/*.js'],
      migrationsRun: true,
    };
  }
}
