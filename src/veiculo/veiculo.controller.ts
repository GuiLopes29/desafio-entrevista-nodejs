import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { VeiculoService, VeiculoEntity } from '.';

@Controller('veiculo')
export class VeiculoController {
  constructor(private veiculoService: VeiculoService) {}

  @Post()
  create(@Body() veiculo: VeiculoEntity) {
    return this.veiculoService.create(veiculo);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.veiculoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() veiculo: VeiculoEntity) {
    return this.veiculoService.update(id, veiculo);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.veiculoService.remove(id);
  }
}
