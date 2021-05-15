import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  // Delete,
} from '@nestjs/common';
import { ControleFluxoService } from './controle-fluxo.service';
import { ControleFluxoDto } from './dto/controle-fluxo.dto';
// import { UpdateControleFluxoDto } from './dto/update-controle-fluxo.dto';

@Controller('controle-fluxo')
export class ControleFluxoController {
  constructor(private readonly controleFluxoService: ControleFluxoService) {}

  @Get()
  findAll() {
    return this.controleFluxoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.controleFluxoService.findOne(+id);
  }

  @Post()
  create(@Body() controleFluxoDto: ControleFluxoDto) {
    return this.controleFluxoService.create(controleFluxoDto);
  }

  @Patch()
  update(@Body() controleFluxoDto: ControleFluxoDto) {
    return this.controleFluxoService.update(controleFluxoDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.controleFluxoService.remove(+id);
  // }
}
