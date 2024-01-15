import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, IsNull, Repository } from 'typeorm';
import { EstabelecimentoEntity, EstacionamentoEntity } from '.';
import { VeiculoEntity } from '../veiculo';

@Injectable()
export class EstabelecimentoService {
  constructor(
    @InjectRepository(EstabelecimentoEntity)
    private estabelecimentoRepository: Repository<EstabelecimentoEntity>,
    @InjectRepository(EstacionamentoEntity)
    private estacionamentoRepository: Repository<EstacionamentoEntity>,
    @InjectRepository(VeiculoEntity)
    private veiculoRepository: Repository<VeiculoEntity>,
  ) {}

  findAll(
    query?: Partial<EstabelecimentoEntity>,
  ): Promise<EstabelecimentoEntity[]> {
    const options: FindManyOptions<EstabelecimentoEntity> = {
      where: { ...query },
    };

    return this.estabelecimentoRepository.find(options);
  }

  findOne(cnpj: string): Promise<EstabelecimentoEntity> {
    return this.estabelecimentoRepository.findOne({ where: { cnpj } });
  }

  async create(
    estabelecimento: EstabelecimentoEntity,
  ): Promise<EstabelecimentoEntity> {
    return this.estabelecimentoRepository.save(estabelecimento);
  }

  async update(
    cnpj: string,
    estabelecimento: EstabelecimentoEntity,
  ): Promise<void> {
    await this.estabelecimentoRepository.update({ cnpj }, estabelecimento);
  }

  async remove(cnpj: string): Promise<void> {
    const estabelecimento = await this.estabelecimentoRepository.findOne({
      where: { cnpj },
    });

    if (!estabelecimento) {
      throw new HttpException(
        'Estabelecimento não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    estabelecimento.ativo = false;
    await this.estabelecimentoRepository.save(estabelecimento);
  }

  async getSumarioEstacionamento(cnpj: string): Promise<any> {
    const estabelecimento = await this.estabelecimentoRepository.findOne({
      where: { cnpj },
      relations: ['estacionamento', 'veiculos'],
    });

    if (!estabelecimento) {
      throw new HttpException(
        'Estabelecimento não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const estacionamentos = estabelecimento.estacionamento;
    const summary = {
      totalEntradas: estacionamentos.length,
      totalSaidas: estacionamentos.filter((e) => e.saida !== null).length,
      entradasPorHora: this.getCountByHour(estacionamentos, 'entrada'),
      saidasPorHora: this.getCountByHour(estacionamentos, 'saida'),
      entradasPorTipoVeiculo: this.getCountByVehicleType(
        estacionamentos,
        estabelecimento.veiculos,
        'entrada',
      ),
      saidasPorTipoVeiculo: this.getCountByVehicleType(
        estacionamentos,
        estabelecimento.veiculos,
        'saida',
      ),
      vagasMotosOcupadas: this.getCurrentCountByVehicleType(
        estacionamentos,
        estabelecimento.veiculos,
        'Moto',
      ),
      vagasCarrosOcupadas: this.getCurrentCountByVehicleType(
        estacionamentos,
        estabelecimento.veiculos,
        'Carro',
      ),
    };

    return summary;
  }

  private getCountByHour(
    estacionamentos: EstacionamentoEntity[],
    tipo: 'entrada' | 'saida',
  ): any {
    const countByHour = {};

    estacionamentos.forEach((estacionamento) => {
      const dateField = tipo === 'entrada' ? 'entrada' : 'saida';
      const date = estacionamento[dateField];

      if (date) {
        const hour = new Date(date).getHours();
        countByHour[hour] = (countByHour[hour] || 0) + 1;
      }
    });

    return countByHour;
  }

  private getCountByVehicleType(
    estacionamentos: EstacionamentoEntity[],
    veiculos: VeiculoEntity[],
    tipo: 'entrada' | 'saida',
  ): any {
    const countByVehicleType = {};

    estacionamentos.forEach((estacionamento) => {
      const dateField = tipo === 'entrada' ? 'entrada' : 'saida';
      const date = estacionamento[dateField];

      if (date) {
        const veiculo = veiculos.find(
          (v) => v.placa === estacionamento.placaVeiculo,
        );
        const tipoVeiculo = veiculo ? veiculo.tipo : 'Desconhecido';

        countByVehicleType[tipoVeiculo] =
          (countByVehicleType[tipoVeiculo] || 0) + 1;
      }
    });

    return countByVehicleType;
  }

  private getCurrentCountByVehicleType(
    estacionamentos: EstacionamentoEntity[],
    veiculos: VeiculoEntity[],
    tipoVeiculo: string,
  ): number {
    const veiculosNoEstacionamento = estacionamentos
      .filter((e) => e.saida === null) // Somente veículos que ainda não saíram
      .map((e) => veiculos.find((v) => v.placa === e.placaVeiculo))
      .filter((v) => v && v.tipo === tipoVeiculo);

    return veiculosNoEstacionamento.length;
  }

  async entrarEstacionamento(
    cnpjEstabelecimento: string,
    placa: string,
  ): Promise<EstacionamentoEntity> {
    const estabelecimento = await this.estabelecimentoRepository
      .findOne({
        where: { cnpj: cnpjEstabelecimento },
      })
      .then((result) => {
        if (!result) {
          throw new HttpException(
            'Estabelecimento não encontrado',
            HttpStatus.NOT_FOUND,
          );
        } else {
          return result;
        }
      });

    // Verifica se o veículo já está em um estacionamento
    await this.estacionamentoRepository
      .findOne({
        where: {
          placaVeiculo: placa,
          saida: IsNull(),
        },
      })
      .then((result) => {
        if (result && !result.saida) {
          throw new HttpException(
            'Veículo já está em um estacionamento',
            HttpStatus.BAD_REQUEST,
          );
        }
      });

    await this.veiculoRepository
      .findOne({
        where: { placa },
      })
      .then((result) => {
        if (!result) {
          throw new HttpException(
            'Veículo não encontrado',
            HttpStatus.NOT_FOUND,
          );
        } else {
          this.veiculoRepository.update(
            { placa },
            { ...result, estabelecimento },
          );
        }
      });

    const entrada = new EstacionamentoEntity();
    entrada.estabelecimento = { ...estabelecimento };
    entrada.placaVeiculo = placa;
    entrada.entrada = new Date();

    return this.estacionamentoRepository.save(entrada);
  }

  async sairEstacionamento(
    cnpjEstabelecimento: string,
    placaVeiculo: string,
  ): Promise<EstacionamentoEntity> {
    const saida = await this.estacionamentoRepository
      .findOne({
        where: {
          estabelecimento: { cnpj: cnpjEstabelecimento },
          saida: IsNull(),
          placaVeiculo,
        },
      })
      .then((result) => {
        if (!result) {
          throw new HttpException(
            'Veículo não encontrado',
            HttpStatus.NOT_FOUND,
          );
        } else {
          return result;
        }
      });

    saida.saida = new Date();

    return this.estacionamentoRepository.save(saida).then((result) => {
      this.veiculoRepository.update(
        { placa: placaVeiculo },
        { estabelecimento: null },
      );
      return result;
    });
  }
}
