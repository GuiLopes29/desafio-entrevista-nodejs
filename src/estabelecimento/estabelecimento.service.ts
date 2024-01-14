import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estabelecimento } from './estabelecimento.entity';

@Injectable()
export class EstabelecimentoService {
  constructor(
    @InjectRepository(Estabelecimento)
    private estabelecimentoRepository: Repository<Estabelecimento>,
  ) {}

  findAll(): Promise<Estabelecimento[]> {
    return this.estabelecimentoRepository.find();
  }

  findOne(id: number): Promise<Estabelecimento> {
    return this.estabelecimentoRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.estabelecimentoRepository.delete(id);
  }

  async create(estabelecimento: Estabelecimento): Promise<Estabelecimento> {
    return this.estabelecimentoRepository.save(estabelecimento);
  }

  async update(id: string, estabelecimento: Estabelecimento): Promise<void> {
    await this.estabelecimentoRepository.update(id, estabelecimento);
  }
}
