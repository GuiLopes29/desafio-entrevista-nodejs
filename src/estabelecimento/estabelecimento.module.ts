import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  EstabelecimentoEntity,
  EstabelecimentoController,
  EstabelecimentoService,
  EstacionamentoEntity,
} from '.';
import { VeiculoEntity, VeiculoModule } from '../veiculo';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstabelecimentoEntity, EstacionamentoEntity]),
    VeiculoModule,
    AuthModule,
  ],
  providers: [EstabelecimentoService],
  controllers: [EstabelecimentoController],
})
export class EstabelecimentoModule {}
