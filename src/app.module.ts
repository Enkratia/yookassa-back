import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { MailerModule } from './_mailer/mailer.module';
import { TasksModule } from './_tasks/_tasks.module';
import { AbilityModule } from './ability/ability.module';
import { HelperModule } from './_utils/helper/helper.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      serveRoot: '/backend-api',
      renderPath: 'images',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
        subscribers: [__dirname + '/**/*.subscriber{.js, .ts}'],
        synchronize: configService.get<boolean>('SYNCHRONIZATION'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    MailerModule,
    TasksModule,
    AbilityModule,
    HelperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
