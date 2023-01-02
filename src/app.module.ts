import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusController } from './status/status.controller';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    TasksModule,
    StatusModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.19.0.2',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
    }),
    StatusModule,
  ],
})
export class AppModule {}
