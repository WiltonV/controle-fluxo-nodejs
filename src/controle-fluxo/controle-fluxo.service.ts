import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ControleFluxoEntity } from './entities/controle-fluxo.entity';
import { CreateControleFluxoDto } from './dto/create-controle-fluxo.dto';
// import { UpdateControleFluxoDto } from './dto/update-controle-fluxo.dto';

let valor = 0;

@Injectable()
export class ControleFluxoService {
  constructor(
    @InjectRepository(ControleFluxoEntity)
    private controleFluxoRepository: Repository<ControleFluxoEntity>,
  ) {}

  increment(valueToIncrement = 1) {
    const value = (valor += valueToIncrement);
    return value;
  }

  decrement(valueToDecrement = 1) {
    const value = (valor -= valueToDecrement);
    if (value < 0) return 0;
    return value;
  }

  async findAll(): Promise<ControleFluxoEntity[]> {
    return await this.controleFluxoRepository.find();
  }

  async create(
    createControleFluxoDto: CreateControleFluxoDto,
  ): Promise<ControleFluxoEntity> {
    return await this.controleFluxoRepository.save(createControleFluxoDto);
  }

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
