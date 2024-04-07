import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { MailerService } from '../_mailer/mailer.service';
import { AbilityModule } from '../ability/ability.module';
import { HelperService } from '../_utils/helper/helper.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRE_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
    AbilityModule,
  ],
  providers: [UsersService, JwtService, MailerService, HelperService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
