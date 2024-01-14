import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  EstabelecimentoEntity,
  EstabelecimentoController,
  EstabelecimentoService,
} from '.';

@Module({
  imports: [TypeOrmModule.forFeature([EstabelecimentoEntity])],
  providers: [EstabelecimentoService],
  controllers: [EstabelecimentoController],
})
export class EstabelecimentoModule {}
