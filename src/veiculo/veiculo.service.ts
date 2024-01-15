import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { VeiculoEntity } from '.';

@Injectable()
export class VeiculoService {
  constructor(
    @InjectRepository(VeiculoEntity)
    private veiculoRepository: Repository<VeiculoEntity>,
  ) {}

  create(veiculo: VeiculoEntity) {
    return this.veiculoRepository.save(veiculo);
  }

  find(query: Partial<VeiculoEntity>) {
    const options: FindManyOptions<VeiculoEntity> = {
      where: { ...query },
    };

    return this.veiculoRepository.find(options);
  }

  findOne(placa: string, ativo?: boolean) {
    return this.veiculoRepository.findOne({ where: { placa, ativo } });
  }

  update(placa: string, veiculo: VeiculoEntity) {
    return this.veiculoRepository.update({ placa }, veiculo);
  }

  async remove(placa: string) {
    const veiculo = await this.veiculoRepository.findOne({ where: { placa } });

    if (!veiculo) {
      throw new HttpException('Veículo não encontrado', HttpStatus.NOT_FOUND);
    }

    veiculo.ativo = false;
    return this.veiculoRepository.save(veiculo);
  }
}
