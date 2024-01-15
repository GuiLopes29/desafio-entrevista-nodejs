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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VeiculoService, VeiculoEntity } from '.';
import { ApiCommonResponses } from '../decorators/common-responses.decorator';
import { VeiculoQueryDto } from './entities';

@ApiTags('Veiculos')
@Controller('veiculo')
export class VeiculoController {
  constructor(private veiculoService: VeiculoService) {}

  @Post()
  @HttpCode(204)
  @ApiOperation({
    summary: 'Cria um novo veículo',
    description:
      'Se o veículo já existir, apenas atualiza o status para ativo novamente',
  })
  @ApiResponse({ status: 204, description: 'Veículo criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao criar veículo' })
  @ApiCommonResponses()
  @ApiBody({ type: VeiculoEntity })
  async create(@Body() veiculo: VeiculoEntity) {
    try {
      veiculo.placa = veiculo.placa.toUpperCase();
      let existe: boolean = false;
      // Verifica se o veículo já existe
      await this.veiculoService.findOne(veiculo.placa).then((result) => {
        if (result && result.ativo) {
          throw new HttpException(
            'Veículo já cadastrado',
            HttpStatus.BAD_REQUEST,
          );
        } else if (result && !result.ativo) {
          existe = true;
        }
      });

      // Cria o veículo, caso exista apenas atualiza o status para ativo novamente.
      if (existe) {
        veiculo.ativo = true;
        return await this.veiculoService
          .update(veiculo.placa, veiculo)
          .then((result) => {
            if (result === undefined) {
              throw new HttpException(
                'Erro ao atualizar veículo',
                HttpStatus.BAD_REQUEST,
              );
            }
            return true;
          });
      }
      await this.veiculoService.create(veiculo);

      return true;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException('Erro interno', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':placa')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Retorna um ou varios veículos existentes',
    description:
      'Também pode ser usado para verificar se o veículo existe e está ativo, retornando o veículo caso esteja ativo',
  })
  @ApiResponse({ status: 200, description: 'Veículo encontrado' })
  @ApiResponse({ status: 400, description: 'Erro ao encontrar veículo' })
  @ApiCommonResponses()
  @ApiParam({
    name: 'placa',
    type: String,
    required: false,
    description: 'Placa do veículo via parametro',
  })
  @ApiQuery({
    name: 'placa',
    required: false,
    type: String,
    description: 'Placa do veículo via query',
  })
  async find(@Query() query?: VeiculoQueryDto, @Param('placa') placa?: string) {
    try {
      if (placa) {
        query = { ...query, placa };
      }

      const result = await this.veiculoService.find(query);
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
  @HttpCode(204)
  @ApiOperation({
    summary: 'Atualiza um veículo existente',
    description:
      'Também pode ser usado para atualizar o estabelecimento do veículo',
  })
  @ApiResponse({ status: 204, description: 'Veículo atualizado' })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar veículo' })
  @ApiCommonResponses()
  @ApiBody({ type: VeiculoEntity })
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
  @ApiCommonResponses()
  @ApiParam({ name: 'placa', required: true, type: String })
  async remove(@Param('placa') placa: string) {
    try {
      await this.veiculoService.findOne(placa).then((result) => {
        if (!result) {
          throw new HttpException(
            'Veículo não encontrado',
            HttpStatus.NOT_FOUND,
          );
        }
      });

      return await this.veiculoService.remove(placa).then((result) => {
        if (result === undefined) {
          throw new HttpException(
            'Erro ao desativar veículo',
            HttpStatus.BAD_REQUEST,
          );
        }
        return true;
      });
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException('Erro interno', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
