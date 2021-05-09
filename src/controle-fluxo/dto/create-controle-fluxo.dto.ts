import { ApiProperty } from '@nestjs/swagger';

export class CreateControleFluxoDto {
  @ApiProperty()
  idFilial: number;

  @ApiProperty()
  currentCount: number;

  @ApiProperty()
  maxCount: number;

  @ApiProperty()
  date: Date;
}
