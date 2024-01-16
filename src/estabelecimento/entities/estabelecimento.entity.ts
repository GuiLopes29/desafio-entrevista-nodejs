import { ApiProperty } from '@nestjs/swagger';
import { VeiculoEntity } from '../../veiculo/entities/';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EstacionamentoEntity } from '.';

@Entity('estabelecimento')
export class Estabelecimento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ example: 'Estacionamento do Zé' })
  nome: string;

  @Column({ nullable: false, unique: true })
  @ApiProperty({ example: '70.466.394/0001-53' })
  cnpj: string;

  @Column({ nullable: false })
  @ApiProperty({ example: 'Rua do Zé, 123' })
  endereco: string;

  @Column({ nullable: true })
  @ApiProperty({ example: '11 1234-5678' })
  telefone: string;

  @OneToMany(() => VeiculoEntity, (veiculo) => veiculo.estabelecimento)
  veiculos: VeiculoEntity[];

  @OneToMany(
    () => EstacionamentoEntity,
    (estacionamento) => estacionamento.estabelecimento,
  )
  estacionamento: EstacionamentoEntity[];

  @Column({ nullable: false })
  @ApiProperty({ example: 0 })
  vagasMotos: number;

  @Column({ nullable: false })
  @ApiProperty({ example: 0 })
  vagasCarros: number;

  @Column({ default: true })
  ativo: boolean;
}
export class EstabelecimentoQueryDto {
  @ApiProperty({ name: 'id', required: false, type: Number })
  id: number;

  @ApiProperty({ name: 'nome', required: false, type: String })
  nome: string;

  @ApiProperty({ name: 'cnpj', required: false, type: String })
  cnpj: string;

  @ApiProperty({ name: 'endereco', required: false, type: String })
  endereco: string;

  @ApiProperty({ name: 'telefone', required: false, type: String })
  telefone: string;

  @ApiProperty({ name: 'vagasMotos', required: false, type: Number })
  vagasMotos: number;

  @ApiProperty({ name: 'vagasCarros', required: false, type: Number })
  vagasCarros: number;

  @ApiProperty({ name: 'ativo', required: false, type: Boolean })
  ativo: boolean;
}
