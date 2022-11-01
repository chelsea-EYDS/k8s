import { Module } from '@nestjs/common';
import { PrivateController } from './private.controller';
import { PrivateService } from './private.service';

@Module({
  controllers: [PrivateController],
  providers: [PrivateService],
})
export class PrivateModule {}
