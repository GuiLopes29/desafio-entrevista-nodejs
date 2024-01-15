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
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Usuario } from './user/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DATABASE_URL,
      entities: [
        EstabelecimentoEntity,
        VeiculoEntity,
        EstacionamentoEntity,
        Usuario,
      ],
      synchronize: true,
    }),
    VeiculoModule,
    EstabelecimentoModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
