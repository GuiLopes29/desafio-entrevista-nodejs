import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EstabelecimentoEntity } from '../../estabelecimento';

enum TipoVeiculo {
  Carro = 'Carro',
  Moto = 'Moto',
}

@Entity('veiculo')
export class Veiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
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
  tipo: TipoVeiculo | string;

  @ManyToOne(
    () => EstabelecimentoEntity,
    (estabelecimento) => estabelecimento.veiculos,
  )
  @JoinColumn({ name: 'estabelecimentoId' })
  estabelecimento: EstabelecimentoEntity;

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

  @ApiProperty({ name: 'estacionamentoId', required: false, type: Number })
  estacionamentoId: number;

  @ApiProperty({ name: 'ativo', required: false, type: Boolean })
  ativo: boolean;
}
