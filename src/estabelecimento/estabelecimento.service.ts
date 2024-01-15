import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Estabelecimento } from './entities/estabelecimento.entity';

@Injectable()
export class EstabelecimentoService {
  constructor(
    @InjectRepository(Estabelecimento)
    private estabelecimentoRepository: Repository<Estabelecimento>,
  ) {}

  findAll(query?: Partial<Estabelecimento>): Promise<Estabelecimento[]> {
    const options: FindManyOptions<Estabelecimento> = {
      where: { ...query },
    };

    return this.estabelecimentoRepository.find(options);
  }

  findOne(cnpj: string): Promise<Estabelecimento> {
    return this.estabelecimentoRepository.findOne({ where: { cnpj } });
  }

  async create(estabelecimento: Estabelecimento): Promise<Estabelecimento> {
    return this.estabelecimentoRepository.save(estabelecimento);
  }

  async update(cnpj: string, estabelecimento: Estabelecimento): Promise<void> {
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
}
