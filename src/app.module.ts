import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configModuleOptions from './config/config-module.options';
import { HealthModule } from './health/health.module';

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions), HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
