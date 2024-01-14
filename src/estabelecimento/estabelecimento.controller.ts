import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  HttpCode,
} from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { Estabelecimento } from './entities/estabelecimento.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Estabelecimentos')
@Controller('estabelecimento')
export class EstabelecimentoController {
  constructor(
    private readonly estabelecimentoService: EstabelecimentoService,
  ) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Lista todos os estabelecimentos' })
  @ApiResponse({ status: 200, description: 'Estabelecimentos listados' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  findAll(): Promise<Estabelecimento[]> {
    return this.estabelecimentoService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Busca um estabelecimento pelo ID' })
  @ApiResponse({ status: 200, description: 'Estabelecimento encontrado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Estabelecimento não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  findOne(@Param('id') id: number): Promise<Estabelecimento> {
    return this.estabelecimentoService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Cria um novo estabelecimento' })
  @ApiResponse({ status: 201, description: 'Estabelecimento criado' })
  @ApiResponse({ status: 400, description: 'Erro ao criar estabelecimento' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  create(@Body() estabelecimento: Estabelecimento): Promise<Estabelecimento> {
    return this.estabelecimentoService.create(estabelecimento);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualiza um estabelecimento' })
  @ApiResponse({ status: 200, description: 'Estabelecimento atualizado' })
  @ApiResponse({
    status: 400,
    description: 'Erro ao atualizar estabelecimento',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Estabelecimento não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  update(
    @Param('id') id: string,
    @Body() estabelecimento: Estabelecimento,
  ): Promise<void> {
    return this.estabelecimentoService.update(id, estabelecimento);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Desativa um estabelecimento' })
  @ApiResponse({ status: 204, description: 'Estabelecimento desativado' })
  @ApiResponse({ status: 400, description: 'Erro ao remover estabelecimento' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Estabelecimento não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  remove(@Param('id') id: string): Promise<void> {
    return this.estabelecimentoService.remove(id);
  }
}
