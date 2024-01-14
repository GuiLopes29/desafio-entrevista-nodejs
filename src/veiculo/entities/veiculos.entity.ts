import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Estabelecimento } from '../../estabelecimento/entities/estabelecimento.entity'; // adjust the path as needed

@Entity()
export class Veiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  placa: string;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  cor: string;

  @Column()
  tipo: string;

  @ManyToOne(
    () => Estabelecimento,
    (estabelecimento) => estabelecimento.veiculos,
  )
  @JoinColumn({ name: 'estabelecimentoId' }) // this column will hold the foreign key
  estabelecimento: Estabelecimento;

  @Column()
  entrada: string;

  @Column()
  saida: string;
}
