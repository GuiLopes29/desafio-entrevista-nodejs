import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  HttpCode,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import {
  Estabelecimento,
  EstabelecimentoQueryDto,
} from './entities/estabelecimento.entity';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiCommonResponses } from '../decorators/common-responses.decorator';

@ApiTags('Estabelecimentos')
@Controller('estabelecimento')
export class EstabelecimentoController {
  constructor(
    private readonly estabelecimentoService: EstabelecimentoService,
  ) {}

  @Get(':cnpj')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Busca um ou vários estabelecimentos pelo CNPJ ou por query',
  })
  @ApiResponse({ status: 200, description: 'Estabelecimento encontrado' })
  @ApiResponse({ status: 404, description: 'Estabelecimento não encontrado' })
  @ApiCommonResponses()
  @ApiParam({
    name: 'cnpj',
    type: String,
    required: false,
    description: 'Consulta utilizando o CNPJ via Param',
  })
  @ApiQuery({
    name: 'cnpj',
    type: String,
    required: false,
    description: 'Consulta utilizando o CNPJ via Query',
  })
  find(
    @Query() query?: EstabelecimentoQueryDto,
    @Param('cnpj') cnpj?: string,
  ): Promise<Estabelecimento[]> {
    try {
      if (cnpj && cnpj !== ',') {
        query = { ...query, cnpj };
      }
      query.cnpj = query.cnpj.replace(/\D/g, '');

      const result = this.estabelecimentoService.findAll(query);

      if (!result) {
        throw new HttpException(
          'Estabelecimento não encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      return result;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        'Estabelecimento não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Cria um novo estabelecimento' })
  @ApiResponse({ status: 201, description: 'Estabelecimento criado' })
  @ApiResponse({ status: 400, description: 'Erro ao criar estabelecimento' })
  @ApiCommonResponses()
  @ApiBody({ type: Estabelecimento })
  async create(
    @Body() estabelecimento: Estabelecimento,
  ): Promise<Estabelecimento> {
    try {
      estabelecimento.cnpj = estabelecimento.cnpj.replace(/\D/g, '');
      let existe: boolean = false;

      // Verifica se o estabelecimento já existe
      await this.estabelecimentoService
        .findOne(estabelecimento.cnpj)
        .then((result) => {
          if (result && result.ativo) {
            throw new HttpException(
              'Estabelecimento já cadastrado',
              HttpStatus.BAD_REQUEST,
            );
          } else if (result && !result.ativo) {
            existe = true;
          }
        });

      // Cria o estabelecimento, caso exista apenas atualiza o status para ativo novamente.
      if (existe) {
        estabelecimento.ativo = true;
        return await this.estabelecimentoService
          .update(estabelecimento.cnpj, estabelecimento)
          .then((result) => {
            if (result === undefined) {
              throw new HttpException(
                'Erro ao atualizar estabelecimento',
                HttpStatus.BAD_REQUEST,
              );
            }
            return estabelecimento;
          });
      }

      return this.estabelecimentoService.create(estabelecimento);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        'Erro ao criar estabelecimento',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':cnpj')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualiza um estabelecimento' })
  @ApiResponse({ status: 200, description: 'Estabelecimento atualizado' })
  @ApiResponse({
    status: 400,
    description: 'Erro ao atualizar estabelecimento',
  })
  @ApiResponse({ status: 404, description: 'Estabelecimento não encontrado' })
  @ApiCommonResponses()
  async update(
    @Param('cnpj') cnpj: string,
    @Body() estabelecimento: Estabelecimento,
  ): Promise<void> {
    try {
      cnpj = cnpj.replace(/\D/g, '');
      estabelecimento.cnpj = cnpj; //CNPJ NÃO PODE SER ALTERADO
      await this.estabelecimentoService.findOne(cnpj).then((result) => {
        if (!result) {
          throw new HttpException(
            'Estabelecimento não encontrado',
            HttpStatus.NOT_FOUND,
          );
        }
      });

      return await this.estabelecimentoService.update(cnpj, estabelecimento);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      console.log(err);
      throw new HttpException(
        'Erro ao atualizar estabelecimento',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':cnpj')
  @HttpCode(204)
  @ApiOperation({ summary: 'Desativa um estabelecimento' })
  @ApiResponse({ status: 204, description: 'Estabelecimento desativado' })
  @ApiResponse({ status: 400, description: 'Erro ao remover estabelecimento' })
  @ApiResponse({ status: 404, description: 'Estabelecimento não encontrado' })
  @ApiCommonResponses()
  async remove(@Param('cnpj') cnpj: string): Promise<void> {
    try {
      await this.estabelecimentoService.findOne(cnpj).then((result) => {
        if (!result) {
          throw new HttpException(
            'Estabelecimento não encontrado',
            HttpStatus.NOT_FOUND,
          );
        }
      });

      return await this.estabelecimentoService.remove(cnpj);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        'Erro ao remover estabelecimento',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
