import { Module } from '@nestjs/common';
import { ControleFluxoService } from './controle-fluxo.service';
import { ControleFluxoGateway } from './controle-fluxo.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControleFluxoEntity } from './entities/controle-fluxo.entity';
import { ControleFluxoController } from './controle-fluxo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ControleFluxoEntity])],
  providers: [ControleFluxoGateway, ControleFluxoService],
  controllers: [ControleFluxoController],
})
export class ControleFluxoModule {}
