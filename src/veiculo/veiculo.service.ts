import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findOne(placa: string) {
    return this.veiculoRepository.findOne({ where: { placa } });
  }

  update(placa: string, veiculo: VeiculoEntity) {
    return this.veiculoRepository.update(placa, veiculo);
  }

  remove(placa: string, ativo: boolean) {
    return this.veiculoRepository.update({ placa }, { ativo });
  }
}
