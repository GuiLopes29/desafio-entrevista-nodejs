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

  findOne(id: number) {
    return this.veiculoRepository.findOne({ where: { id } });
  }

  update(id: number, veiculo: VeiculoEntity) {
    return this.veiculoRepository.update(id, veiculo);
  }

  remove(id: number) {
    return this.veiculoRepository.delete(id);
  }
}
