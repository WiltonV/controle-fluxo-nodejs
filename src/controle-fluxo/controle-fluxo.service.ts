import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ControleFluxoEntity } from './entities/controle-fluxo.entity';

import { ControleFluxoDto } from './dto/controle-fluxo.dto';
// import { UpdateControleFluxoDto } from './dto/update-controle-fluxo.dto';

@Injectable()
export class ControleFluxoService {
  constructor(
    @InjectRepository(ControleFluxoEntity)
    private controleFluxoRepository: Repository<ControleFluxoEntity>,
  ) {}

  async findAll(): Promise<ControleFluxoEntity[]> {
    return await this.controleFluxoRepository.find();
  }

  async create(controleFluxoDto: ControleFluxoDto) {
    return await this.controleFluxoRepository.save(controleFluxoDto);
  }

  async findOne(filialId: number): Promise<ControleFluxoDto> {
    return await this.controleFluxoRepository.findOne({
      where: { idFilial: filialId },
    });
  }

  async update(controleFluxoDto: ControleFluxoDto) {
    return await this.controleFluxoRepository.save(controleFluxoDto);
  }

  async increment(valueToIncrement: number, filialId: number) {
    const filial = await this.findOne(filialId);

    if (!filial) {
      await this.create({
        idFilial: filialId,
        currentCount: valueToIncrement,
        maxCount: valueToIncrement,
        date: new Date(),
      });

      return valueToIncrement;
    }

    const incrementedValue = (filial.currentCount += valueToIncrement);
    const filialIncrement = {
      ...filial,
      currentCount: incrementedValue,
      maxCount:
        incrementedValue > filial.maxCount ? incrementedValue : filial.maxCount,
    };

    await this.update(filialIncrement);

    return filialIncrement.currentCount;
  }

  async decrement(valueToDecrement: number, filialId: number) {
    const filial = await this.findOne(filialId);

    if (!filial) {
      await this.create({
        idFilial: filialId,
        currentCount: 0,
        maxCount: 0,
        date: new Date(),
      });

      return 0;
    }

    const decrementedValue = (filial.currentCount -= valueToDecrement);
    const filialDecrement = {
      ...filial,
      currentCount: decrementedValue < 0 ? 0 : decrementedValue,
      maxCount: filial.maxCount,
    };

    await this.update(filialDecrement);

    return filialDecrement.currentCount;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} controleFluxo`;
  // }
}
