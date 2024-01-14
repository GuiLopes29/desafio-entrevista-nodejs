import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Estabelecimento } from '../../estabelecimento/entities/estabelecimento.entity'; // adjust the path as needed
import { ApiProperty } from '@nestjs/swagger';

export enum TipoVeiculo {
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
