import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { AxiosRequestConfig } from 'axios';

import { CreateKassaDto } from './dto/create-kassa.dto';
import { Kassa } from './entities/kassa.entity';

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
    billToCreate.title = dto.title;

    const bill = await this.kassaRepository.save(billToCreate);

    const { KASSA_ID, KASSA_SECRET_KEY } = process.env;

    const requestData = {
      amount: {
        value: bill.price,
        currency: 'RUB',
      },
      confirmation: {
        type: 'redirect',
        return_url: 'https://finsweet.ru/contact-us',
      },
      capture: true,
      description: `Покупка ${bill.title}`,
    };

    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': bill.id,
      },
      auth: {
        username: KASSA_ID,
        password: KASSA_SECRET_KEY,
      },
    };

    try {
      const res = await this.httpService.axiosRef.post(
        'https://api.yookassa.ru/v3/payments',
        JSON.stringify(requestData),
        requestConfig,
      );

      const confirmation_url = res?.data?.confirmation?.confirmation_url;

      if (!confirmation_url) {
        throw new BadRequestException('Failed to pay');
      }

      return { confirmation_url };
    } catch (error) {
      throw new BadRequestException('Failed to pay');
    }
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

// **
// const checkRequestStatus = () => {
//   const interval = setInterval(async () => {
//     const res = await this.httpService.axiosRef.post(
//       'https://api.yookassa.ru/v3/payments',
//       JSON.stringify(requestData),
//       requestConfig,
//     );

//     const status = res.data.status;

//     if (status === 'canceled' || status === 'succeeded') {
//       const billToUpdate = new Kassa(status);
//       billToUpdate.id = bill.id;

//       await this.kassaRepository.save(billToUpdate);
//       clearInterval(interval);
//     }
//   }, 1000);
// };

// checkRequestStatus();

// **
// const res = await firstValueFrom(
//   this.httpService.post('https://api.yookassa.ru/v3/payments').pipe(
//     catchError((error: AxiosError) => {
//       console.log(error);
//       throw 'An error happened!';
//     }),
//   ),
// );
