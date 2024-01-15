import { ApiProperty } from '@nestjs/swagger';
import { Veiculo } from '../../veiculo/entities/veiculos.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EstabelecimentoEntity } from '.';

@Entity('estacionamento')
export class Estacionamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => EstabelecimentoEntity,
    (estabelecimento) => estabelecimento.estacionamento,
    { nullable: false },
  )
  @JoinColumn({ name: 'estabelecimentoId' })
  estabelecimento: EstabelecimentoEntity;

  @Column({ nullable: false })
  placaVeiculo: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  entrada: Date;

  @Column({ type: 'timestamp', nullable: true })
  saida: Date;
}
