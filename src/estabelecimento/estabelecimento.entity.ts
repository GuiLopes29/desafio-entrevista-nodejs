import { Veiculo } from '../veiculo/veiculos.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Estabelecimento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cnpj: string;

  @Column()
  endereco: string;

  @Column()
  telefone: string;

  @OneToMany(() => Veiculo, (veiculo) => veiculo.estabelecimento)
  veiculos: Veiculo[];

  @Column()
  vagasMotos: number;

  @Column()
  vagasCarros: number;
}
