import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VeiculoService, VeiculoEntity } from '.';

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

describe('VeiculoService', () => {
  let service: VeiculoService;
  let repo: Repository<VeiculoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VeiculoService,
        {
          provide: getRepositoryToken(VeiculoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VeiculoService>(VeiculoService);
    repo = module.get<Repository<VeiculoEntity>>(
      getRepositoryToken(VeiculoEntity),
    );
  });

  it('should create a vehicle', async () => {
    jest.spyOn(repo, 'save').mockResolvedValue(veiculo);
    expect(await service.create(veiculo)).toBe(veiculo);
  });

  it('should find vehicles', async () => {
    jest.spyOn(repo, 'find').mockResolvedValue([veiculo]);
    expect(await service.find({})).toEqual([veiculo]);
  });

  it('should find one vehicle', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValue(veiculo);
    expect(await service.findOne(veiculo.placa)).toBe(veiculo);
  });

  it('should update a vehicle', async () => {
    jest.spyOn(repo, 'update').mockResolvedValue(undefined);
    await service.update(veiculo.placa, veiculo);
    expect(repo.update).toHaveBeenCalledWith({ placa: veiculo.placa }, veiculo);
  });

  it('should remove a vehicle', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValue(veiculo);
    jest.spyOn(repo, 'save').mockResolvedValue(undefined);
    await service.remove(veiculo.placa);
    expect(repo.save).toHaveBeenCalledWith({ ...veiculo, ativo: false });
  });
});
