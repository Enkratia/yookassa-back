import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KassaService } from './kassa.service';
import { CreateKassaDto } from './dto/create-kassa.dto';
@Controller('kassa')
export class KassaController {
  constructor(private readonly kassaService: KassaService) {}

  @Post()
  async create(@Body() createKassaDto: CreateKassaDto) {
    return await this.kassaService.create(createKassaDto);
  }

  // @Get()
  // findAll() {
  //   return this.kassaService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.kassaService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateKassaDto: UpdateKassaDto) {
  //   return this.kassaService.update(+id, updateKassaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.kassaService.remove(+id);
  // }
}
