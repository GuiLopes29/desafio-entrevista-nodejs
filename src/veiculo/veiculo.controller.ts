import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { VeiculoService, VeiculoEntity } from '.';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Veiculos')
@Controller('veiculo')
export class VeiculoController {
  constructor(private veiculoService: VeiculoService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Cria um novo veículo' })
  @ApiResponse({ status: 201, description: 'Veículo criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao criar veículo' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  @ApiBody({ type: VeiculoEntity })
  async create(@Body() veiculo: VeiculoEntity) {
    try {
      // Verifica se o veículo já existe
      await this.veiculoService.findOne(veiculo.placa).then((result) => {
        if (result) {
          throw new HttpException(
            'Veículo já cadastrado',
            HttpStatus.BAD_REQUEST,
          );
        }
      });

      // Cria o veículo
      const result = await this.veiculoService.create(veiculo);

      return { id: result.placa };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException('Erro interno', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':placa')
  @HttpCode(200)
  @ApiOperation({ summary: 'Retorna um veículo existente' })
  @ApiResponse({ status: 200, description: 'Veículo encontrado' })
  @ApiResponse({ status: 400, description: 'Erro ao encontrar veículo' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  @ApiParam({ name: 'placa', required: true, type: String })
  async findOne(@Param('placa') placa: string) {
    try {
      const result = await this.veiculoService.findOne(placa);
      if (!result) {
        throw new HttpException('Veículo não encontrado', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException('Erro interno', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':placa')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualiza um veículo existente' })
  @ApiResponse({ status: 200, description: 'Veículo atualizado' })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar veículo' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  async update(@Param('placa') placa: string, @Body() veiculo: VeiculoEntity) {
    try {
      await this.veiculoService.findOne(placa).then((result) => {
        if (!result) {
          throw new HttpException(
            'Veículo não encontrado',
            HttpStatus.BAD_REQUEST,
          );
        }
      });
      return this.veiculoService.update(placa, veiculo);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException('Erro interno', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete()
  @HttpCode(200)
  @ApiOperation({ summary: 'Desativa um veículo' }) // Desativando o veiculo fica indisponível para uso, mas não é removido do banco de dados.
  @ApiResponse({ status: 200, description: 'Veículo desativado' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  @ApiQuery({ name: 'placa', required: true, type: String })
  @ApiQuery({ name: 'ativo', required: true, type: Boolean })
  async remove(@Query() query: { placa: string; ativo: boolean }) {
    try {
      const { placa, ativo } = query;
      await this.veiculoService.findOne(placa).then((result) => {
        if (!result) {
          throw new HttpException(
            'Veículo não encontrado',
            HttpStatus.NOT_FOUND,
          );
        }
      });
      return await this.veiculoService.remove(placa, ativo);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException('Erro interno', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
