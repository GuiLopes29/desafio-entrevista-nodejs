import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  Estabelecimento,
  EstabelecimentoModule,
  EstabelecimentoController,
  EstabelecimentoService,
} from './estabelecimento';
import {
  Veiculo,
  VeiculoController,
  VeiculoModule,
  VeiculoService,
} from './veiculo';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DATABASE_URL,
      entities: [Estabelecimento, Veiculo],
      synchronize: true,
    }),
    EstabelecimentoModule,
    VeiculoModule,
  ],
  controllers: [AppController, VeiculoController, EstabelecimentoController],
  providers: [AppService, VeiculoService, EstabelecimentoService],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
