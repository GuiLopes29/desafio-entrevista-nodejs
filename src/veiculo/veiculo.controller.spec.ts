import { Test, TestingModule } from '@nestjs/testing';
import { VeiculoController } from './veiculo.controller';
import { VeiculoService } from './veiculo.service';
import { VeiculoEntity } from './entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Veiculo } from './entities/veiculos.entity';

const veiculoMock: VeiculoEntity = {
  id: 6,
  placa: 'ABC-1134',
  marca: 'Toyota',
  modelo: 'Corolla',
  cor: 'Branco',
  tipo: 'Carro',
  estabelecimento: null,
  ativo: true,
};

describe('VeiculoController', () => {
  let controller: VeiculoController;
  let service: VeiculoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeiculoController],
      providers: [
        VeiculoService,
        {
          provide: getRepositoryToken(Veiculo),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            find: jest.fn(),
            // add other methods you use from the repository
          },
        },
      ],
    }).compile();

    controller = module.get<VeiculoController>(VeiculoController);
    service = module.get<VeiculoService>(VeiculoService);
  });

  describe('create', () => {
    it('should create a new vehicle', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(service, 'create').mockResolvedValue(veiculoMock);

      const result = await controller.create(veiculoMock);

      expect(result).toBeDefined();
    });
  });

  describe('find', () => {
    it('should find all vehicles', async () => {
      jest.spyOn(service, 'find').mockResolvedValue([veiculoMock]);

      const result = await controller.find();

      expect(result).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update a vehicle by placa', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(veiculoMock);
      jest.spyOn(service, 'update').mockResolvedValue(undefined);

      const result = await controller.update('ABC-1134', veiculoMock);

      expect(result).toBeUndefined();
    });
  });

  describe('remove', () => {
    it('should remove a vehicle by placa', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(veiculoMock);
      jest.spyOn(service, 'remove').mockResolvedValue(veiculoMock);

      const result = await controller.remove('ABC-1134');

      expect(result).toBeDefined();
    });
  });
});
