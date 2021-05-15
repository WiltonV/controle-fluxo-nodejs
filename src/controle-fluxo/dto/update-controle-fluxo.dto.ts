import { PartialType } from '@nestjs/mapped-types';
import { ControleFluxoDto } from './controle-fluxo.dto';

export class UpdateControleFluxoDto extends PartialType(ControleFluxoDto) {
  id: number;
}
