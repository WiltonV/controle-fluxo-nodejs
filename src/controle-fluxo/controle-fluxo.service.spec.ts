import { Test, TestingModule } from '@nestjs/testing';
import { ControleFluxoService } from './controle-fluxo.service';

describe('ControleFluxoService', () => {
  let service: ControleFluxoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControleFluxoService],
    }).compile();

    service = module.get<ControleFluxoService>(ControleFluxoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
