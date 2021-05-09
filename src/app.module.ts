import { Module } from '@nestjs/common';
import { ControleFluxoModule } from './controle-fluxo/controle-fluxo.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, ControleFluxoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
