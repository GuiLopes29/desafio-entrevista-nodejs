import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Estabelecimento } from '../../estabelecimento/entities/estabelecimento.entity'; // adjust the path as needed
import { ApiProperty, ApiQuery } from '@nestjs/swagger';

enum TipoVeiculo {
  Carro = 'Carro',
  Moto = 'Moto',
}

@Entity()
export class Veiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ example: 'ABC-1234' })
  placa: string;

  @Column({ nullable: false })
  @ApiProperty({ example: 'Toyota' })
  marca: string;

  @Column({ nullable: false })
  @ApiProperty({ example: 'Corolla' })
  modelo: string;

  @Column({ nullable: false })
  @ApiProperty({ example: 'Branco' })
  cor: string;

  @Column({ nullable: false })
  @ApiProperty({ example: 'Carro' })
  tipo: TipoVeiculo;

  @ManyToOne(
    () => Estabelecimento,
    (estabelecimento) => estabelecimento.veiculos,
  )
  @JoinColumn({ name: 'estabelecimentoId' })
  estabelecimento: Estabelecimento;

  @Column({ nullable: false })
  @ApiProperty({ example: new Date() })
  entrada: Date;

  @Column({ nullable: true })
  saida: Date;

  @Column({ default: true })
  ativo: boolean;
}

export class VeiculoQueryDto {
  @ApiProperty({ name: 'id', required: false, type: Number })
  id: number;

  @ApiProperty({ name: 'placa', required: false, type: String })
  placa: string;

  @ApiProperty({ name: 'marca', required: false, type: String })
  marca: string;

  @ApiProperty({ name: 'modelo', required: false, type: String })
  modelo: string;

  @ApiProperty({ name: 'cor', required: false, type: String })
  cor: string;

  @ApiProperty({ name: 'tipo', required: false, type: String })
  tipo: TipoVeiculo;

  @ApiProperty({ name: 'estabelecimentoId', required: false, type: Number })
  estabelecimentoId: number;

  @ApiProperty({ name: 'saida', required: false, type: Date })
  entrada: Date;

  @ApiProperty({ name: 'saida', required: false, type: Date })
  saida: Date;

  @ApiProperty({ name: 'ativo', required: false, type: Boolean })
  ativo: boolean;
}
