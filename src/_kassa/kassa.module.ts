import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { KassaService } from './kassa.service';
import { KassaController } from './kassa.controller';
import { Kassa } from './entities/kassa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kassa]), HttpModule],
  controllers: [KassaController],
  providers: [KassaService],
})
export class KassaModule {}
