import { Module } from '@nestjs/common';

import { TasksService } from './_tasks.service';
// import { SubscribeModule } from '../subscribe/subscribe.module';

@Module({
  // imports: [SubscribeModule],
  providers: [TasksService],
})
export class TasksModule {}
