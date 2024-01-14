import { Test, TestingModule } from '@nestjs/testing';
import { EstabelecimentoController } from './estabelecimento.controller';
import { EstabelecimentoService } from './estabelecimento.service';

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

  describe('findAll', () => {
    it('should return an array of estabelecimentos', async () => {
      const result = [];
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(result));
      expect(await controller.findAll()).toBe(result);
    });
  });

  // Add similar tests for findOne, create, update, and remove
});
