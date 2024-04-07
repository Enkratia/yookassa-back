import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

import { CreateKassaDto } from './dto/create-kassa.dto';
import { Kassa } from './entities/kassa.entity';
import { Repository } from 'typeorm';
import { AxiosError } from 'axios';

@Injectable()
export class KassaService {
  constructor(
    @InjectRepository(Kassa)
    private readonly kassaRepository: Repository<Kassa>,
    private readonly httpService: HttpService,
  ) {}

  async create(dto: CreateKassaDto) {
    const billToCreate = new Kassa();
    billToCreate.firstname = dto.firstname;
    billToCreate.lastname = dto.lastname;
    billToCreate.price = dto.price;

    const bill = await this.kassaRepository.save(billToCreate);

    const id = bill.id;
    const { KASSA_ID, KASSA_SECRET_KEY } = process.env;

    const res = await firstValueFrom(
      this.httpService.get('https://api.yookassa.ru/v3/payments').pipe(
        catchError((error: AxiosError) => {
          console.log(error);
          throw 'An error happened!';
        }),
      ),
    );
  }

  // findAll() {
  //   return `This action returns all kassa`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} kassa`;
  // }

  // update(id: number, updateKassaDto: UpdateKassaDto) {
  //   return `This action updates a #${id} kassa`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} kassa`;
  // }
}
