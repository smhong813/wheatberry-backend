import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { InjectDataSource } from '@nestjs/typeorm';
import { AUTH_DB } from 'src/db/database.constants';
import { DataSource } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    @InjectDataSource(AUTH_DB)
    private dataSource: DataSource,
  ) {}

  @Get()
  @HealthCheck()
  healthCheck() {
    return this.health.check([
      () =>
        this.db.pingCheck('database', {
          connection: this.dataSource,
        }),
    ]);
  }
}
