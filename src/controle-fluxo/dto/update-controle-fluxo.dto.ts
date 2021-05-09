import { PartialType } from '@nestjs/mapped-types';
import { CreateControleFluxoDto } from './create-controle-fluxo.dto';

export class UpdateControleFluxoDto extends PartialType(
  CreateControleFluxoDto,
) {
  id: number;
}
