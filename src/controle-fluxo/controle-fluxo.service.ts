import { Injectable } from '@nestjs/common';
// import { CreateControleFluxoDto } from './dto/create-controle-fluxo.dto';
// import { UpdateControleFluxoDto } from './dto/update-controle-fluxo.dto';

let valor = 0;

@Injectable()
export class ControleFluxoService {
  increment(valueToIncrement = 1) {
    const value = (valor += valueToIncrement);
    return value;
  }

  decrement(valueToDecrement = 1) {
    const value = (valor -= valueToDecrement);
    if (value < 0) return 0;
    return value;
  }
  // create(createControleFluxoDto: CreateControleFluxoDto) {
  //   return 'This action adds a new controleFluxo';
  // }

  // findAll() {
  //   return `This action returns all controleFluxo`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} controleFluxo`;
  // }

  // update(id: number, updateControleFluxoDto: UpdateControleFluxoDto) {
  //   return `This action updates a #${id} controleFluxo`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} controleFluxo`;
  // }
}
