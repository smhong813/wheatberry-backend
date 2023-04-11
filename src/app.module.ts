import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configModuleOptions from './config/config-module.options';
import { AUTH_DB } from './db/database.constants';
import { DatabaseConfigService } from './db/database.service';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: AUTH_DB,
      useClass: DatabaseConfigService,
    }),
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
