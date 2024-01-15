import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum TipoUsuario {
  ADMIN = 0,
  ESTABELECIMENTO = 1,
  CLIENTE = 2,
}

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ example: 'João da Silva' })
  nome: string;

  @Column({ nullable: false, unique: true })
  @ApiProperty({ example: '123.456.789-10' })
  cpf: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Rua do João, 123' })
  endereco: string;

  @Column({ nullable: true })
  @ApiProperty({ example: '11 1234-5678' })
  telefone: string;

  @Column({ nullable: false })
  @ApiProperty({ example: 'joao.silva' })
  login: string;

  @Column({ nullable: false })
  @ApiProperty({ example: '123456' })
  senha: string;

  @Column({ nullable: false })
  @ApiProperty({ example: 'Admin' })
  tipo: TipoUsuario;

  @Column({ default: true })
  ativo: boolean;
}
