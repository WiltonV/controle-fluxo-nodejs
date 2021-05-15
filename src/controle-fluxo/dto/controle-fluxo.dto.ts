import { ApiProperty } from '@nestjs/swagger';

export class ControleFluxoDto {
  @ApiProperty()
  idFilial: number;

  @ApiProperty()
  currentCount: number;

  @ApiProperty()
  maxCount: number;

  @ApiProperty()
  date: Date;
}
