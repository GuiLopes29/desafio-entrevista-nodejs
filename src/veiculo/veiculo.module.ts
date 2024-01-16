import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoEntity, VeiculoController, VeiculoService } from '.';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([VeiculoEntity]), AuthModule],
  providers: [VeiculoService],
  controllers: [VeiculoController],
  exports: [VeiculoService],
})
export class VeiculoModule {}
