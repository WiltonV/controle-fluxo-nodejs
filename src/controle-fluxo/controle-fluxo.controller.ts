import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { ControleFluxoService } from './controle-fluxo.service';
import { CreateControleFluxoDto } from './dto/create-controle-fluxo.dto';
// import { UpdateControleFluxoDto } from './dto/update-controle-fluxo.dto';

@Controller('controle-fluxo')
export class ControleFluxoController {
  constructor(private readonly controleFluxoService: ControleFluxoService) {}

  @Post()
  create(@Body() createControleFluxoDto: CreateControleFluxoDto) {
    return this.controleFluxoService.create(createControleFluxoDto);
  }

  @Get()
  findAll() {
    return this.controleFluxoService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.controleFluxoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateControleFluxoDto: UpdateControleFluxoDto,
  // ) {
  //   return this.controleFluxoService.update(+id, updateControleFluxoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.controleFluxoService.remove(+id);
  // }
}
