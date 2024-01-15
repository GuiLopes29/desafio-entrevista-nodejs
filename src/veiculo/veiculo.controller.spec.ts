import { Test, TestingModule } from '@nestjs/testing';
import { VeiculoController, VeiculoService, VeiculoEntity } from '.';

const veiculo: VeiculoEntity = {
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
  let veiculoController: VeiculoController;
  let veiculoService: VeiculoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeiculoController],
      providers: [
        {
          provide: VeiculoService,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    veiculoController = module.get<VeiculoController>(VeiculoController);
    veiculoService = module.get<VeiculoService>(VeiculoService);
  });

  it('should create a vehicle', async () => {
    jest.spyOn(veiculoService, 'create').mockResolvedValue(veiculo);
    expect(await veiculoController.create(veiculo)).toBe(veiculo);
  });

  it('should find a vehicle', async () => {
    jest.spyOn(veiculoService, 'find').mockResolvedValue([veiculo]);
    expect(await veiculoController.find()).toBe(veiculo);
  });

  it('should update a vehicle', async () => {
    jest.spyOn(veiculoService, 'update').mockResolvedValue(Promise.resolve());
    expect(await veiculoController.update(veiculo.placa, veiculo)).toBe(
      veiculo,
    );
  });

  it('should remove a vehicle', async () => {
    jest.spyOn(veiculoService, 'remove').mockResolvedValue(Promise.resolve());
    expect(await veiculoController.remove(veiculo.placa)).toBe(true);
  });
});
