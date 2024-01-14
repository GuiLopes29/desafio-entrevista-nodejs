import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
} from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { Estabelecimento } from './estabelecimento.entity';

@Controller('estabelecimento')
export class EstabelecimentoController {
  constructor(
    private readonly estabelecimentoService: EstabelecimentoService,
  ) {}

  @Get()
  findAll(): Promise<Estabelecimento[]> {
    return this.estabelecimentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Estabelecimento> {
    return this.estabelecimentoService.findOne(id);
  }

  @Post()
  create(@Body() estabelecimento: Estabelecimento): Promise<Estabelecimento> {
    return this.estabelecimentoService.create(estabelecimento);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() estabelecimento: Estabelecimento,
  ): Promise<void> {
    return this.estabelecimentoService.update(id, estabelecimento);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.estabelecimentoService.remove(id);
  }
}
