import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  EstabelecimentoEntity,
  EstabelecimentoController,
  EstabelecimentoService,
  EstacionamentoEntity,
} from '.';
import { VeiculoEntity } from '../veiculo';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EstabelecimentoEntity,
      EstacionamentoEntity,
      VeiculoEntity,
    ]),
  ],
  providers: [EstabelecimentoService],
  controllers: [EstabelecimentoController],
})
export class EstabelecimentoModule {}
