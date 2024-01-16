import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstabelecimentoEntity, EstacionamentoEntity } from '.';
import { VeiculoEntity, VeiculoService } from '../veiculo';
import { EstabelecimentoService } from './estabelecimento.service';

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

const estabelecimentoMock: EstabelecimentoEntity = {
  id: 1,
  nome: 'nome',
  cnpj: 'cnpj',
  endereco: 'endereco',
  telefone: 'telefone',
  veiculos: [],
  estacionamento: [],
  vagasMotos: 1,
  vagasCarros: 1,
  ativo: true,
};

const estacionamentoMock: EstacionamentoEntity = {
  id: 1,
  estabelecimento: estabelecimentoMock,
  placaVeiculo: veiculoMock.placa,
  entrada: new Date(),
  saida: null,
};

describe('EstabelecimentoService', () => {
  let service: EstabelecimentoService;
  let veiculoService: VeiculoService;
  let estabelecimentoRepository: any;
  let estacionamentoRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstabelecimentoService,
        {
          provide: getRepositoryToken(EstabelecimentoEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(EstacionamentoEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: VeiculoService,
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EstabelecimentoService>(EstabelecimentoService);
    veiculoService = module.get<VeiculoService>(VeiculoService);
    estabelecimentoRepository = module.get(
      getRepositoryToken(EstabelecimentoEntity),
    );
    estacionamentoRepository = module.get(
      getRepositoryToken(EstacionamentoEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of estabelecimentos', async () => {
      const result: EstabelecimentoEntity[] = [];
      jest
        .spyOn(estabelecimentoRepository, 'find')
        .mockImplementation(async () => result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return an estabelecimento', async () => {
      const result: EstabelecimentoEntity = new EstabelecimentoEntity();
      jest
        .spyOn(estabelecimentoRepository, 'findOne')
        .mockImplementation(async () => result);

      expect(await service.findOne('cnpj')).toBe(result);
    });
  });

  describe('create', () => {
    it('should return an estabelecimento', async () => {
      const result: EstabelecimentoEntity = new EstabelecimentoEntity();
      jest
        .spyOn(estabelecimentoRepository, 'save')
        .mockImplementation(async () => result);

      expect(await service.create(result)).toBe(result);
    });
  });

  describe('update', () => {
    it('should return void', async () => {
      const result: EstabelecimentoEntity = new EstabelecimentoEntity();
      jest
        .spyOn(estabelecimentoRepository, 'update')
        .mockImplementation(async () => result);

      expect(await service.update('cnpj', result)).toBeUndefined();
    });
  });

  describe('remove', () => {
    it('should return void', async () => {
      const result: EstabelecimentoEntity = new EstabelecimentoEntity();
      jest
        .spyOn(estabelecimentoRepository, 'findOne')
        .mockImplementation(async () => result);
      jest
        .spyOn(estabelecimentoRepository, 'save')
        .mockImplementation(async () => result);

      expect(await service.remove('cnpj')).toBeUndefined();
    });
  });

  describe('getSumarioEstacionamento', () => {
    it('should return an object', async () => {
      jest
        .spyOn(estabelecimentoRepository, 'findOne')
        .mockImplementation(async () => estabelecimentoMock);

      const summary = await service.getSumarioEstacionamento('cnpj');
      expect(summary).toBeDefined();
      expect(summary).toHaveProperty('totalEntradas');
      expect(summary).toHaveProperty('totalSaidas');
    });
  });

  describe('entrarEstacionamento', () => {
    it('should return EstacionamentoEntity', async () => {
      jest
        .spyOn(veiculoService, 'findOne')
        .mockImplementation(async () => veiculoMock);

      jest
        .spyOn(service, 'entrarEstacionamento')
        .mockImplementation(async () => estacionamentoMock);

      const cnpjEstabelecimento = 'testCnpj';
      const placa = 'testPlaca';

      const estabelecimento: EstabelecimentoEntity =
        new EstabelecimentoEntity();
      estabelecimento.estacionamento = [];
      estabelecimentoRepository.findOne.mockResolvedValue(estabelecimento);
      estacionamentoRepository.findOne(estacionamentoMock);

      veiculoService.findOne(veiculoMock.placa);

      const result = await service.entrarEstacionamento(
        cnpjEstabelecimento,
        placa,
      );

      expect(result).toBeDefined();
    });
  });

  describe('sairEstacionamento', () => {
    it('should return EstacionamentoEntity', async () => {
      jest
        .spyOn(veiculoService, 'findOne')
        .mockImplementation(async () => veiculoMock);

      estacionamentoMock.saida = new Date();
      jest
        .spyOn(service, 'sairEstacionamento')
        .mockImplementation(async () => estacionamentoMock);

      const cnpjEstabelecimento = 'testCnpj';
      const placa = 'testPlaca';

      const estabelecimento: EstabelecimentoEntity =
        new EstabelecimentoEntity();
      estabelecimento.estacionamento = [];
      estabelecimentoRepository.findOne.mockResolvedValue(estabelecimento);
      estacionamentoRepository.findOne(estacionamentoMock);

      veiculoService.findOne(veiculoMock.placa);

      const result = await service.sairEstacionamento(
        cnpjEstabelecimento,
        placa,
      );

      expect(result).toBeDefined();
    });
  });
});
