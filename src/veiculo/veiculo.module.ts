import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoEntity, VeiculoController, VeiculoService } from '.';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([VeiculoEntity]), AuthModule],
  providers: [VeiculoService],
  controllers: [VeiculoController],
})
export class VeiculoModule {}
