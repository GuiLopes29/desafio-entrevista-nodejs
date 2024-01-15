import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  EstabelecimentoEntity,
  EstacionamentoEntity,
  EstabelecimentoModule,
} from './estabelecimento';
import { VeiculoEntity, VeiculoModule } from './veiculo';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DATABASE_URL,
      entities: [EstabelecimentoEntity, VeiculoEntity, EstacionamentoEntity],
      synchronize: true,
    }),
    VeiculoModule,
    EstabelecimentoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
