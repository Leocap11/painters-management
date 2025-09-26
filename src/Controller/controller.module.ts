import { Module } from '@nestjs/common';
import { DomainModule } from 'src/Domain/domain.module';

const controllers = [];

@Module({
  imports: [DomainModule],
  controllers: [...controllers]
})
export class ControllerModule {}
