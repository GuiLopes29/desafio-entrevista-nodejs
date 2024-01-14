import { Test, TestingModule } from '@nestjs/testing';
import { EstabelecimentoController } from './estabelecimento.controller';
import { EstabelecimentoService } from './estabelecimento.service';

// This is the mock service
const mockEstabelecimentoService = () => ({
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
});

describe('EstabelecimentoController', () => {
  let controller: EstabelecimentoController;
  let service: EstabelecimentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstabelecimentoController],
      providers: [
        {
          provide: EstabelecimentoService,
          useFactory: mockEstabelecimentoService,
        },
      ],
    }).compile();

    controller = module.get<EstabelecimentoController>(
      EstabelecimentoController,
    );
    service = module.get<EstabelecimentoService>(EstabelecimentoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add your tests here
});
