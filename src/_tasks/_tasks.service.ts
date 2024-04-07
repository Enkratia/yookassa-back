import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

// import { SubscribeService } from '../subscribe/subscribe.service';

@Injectable()
export class TasksService {
  // constructor(private subscribeService: SubscribeService) {}

  // @Cron('0 */2 * * * *')
  async sendMailToSubscribers() {
    // await this.subscribeService.sendMailToSubscribers();
    console.log('cron');
  }
}
