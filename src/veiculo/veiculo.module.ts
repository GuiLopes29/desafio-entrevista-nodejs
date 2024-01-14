import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoEntity, VeiculoController, VeiculoService } from '.';

@Module({
  imports: [TypeOrmModule.forFeature([VeiculoEntity])],
  providers: [VeiculoService],
  controllers: [VeiculoController],
})
export class VeiculoModule {}
