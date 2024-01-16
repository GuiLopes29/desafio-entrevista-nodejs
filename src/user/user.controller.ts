import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Usuario } from './entities';
import { UserService } from './user.service';
import { TipoUsuario } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';

@ApiTags('Usuario')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly AuthService: AuthService,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: Usuario,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação',
  })
  @ApiResponse({
    status: 409,
    description: 'Usuário já existe',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno',
  })
  @ApiBody({
    required: true,
    type: Usuario,
  })
  async create(@Body() usuario: Usuario): Promise<Usuario> {
    try {
      usuario.tipo =
        TipoUsuario[
          (
            usuario.tipo as unknown as string
          ).toUpperCase() as keyof typeof TipoUsuario
        ];

      return await this.userService.create(usuario);
    } catch (err) {
      if (err.code === '23505') {
        throw new HttpException('Usuário já existe', HttpStatus.CONFLICT);
      }
      throw new HttpException('Erro interno', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Realiza o login do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    type: Usuario,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno',
  })
  @ApiBody({
    required: true,
    type: Usuario,
  })
  async login(@Body() signInDto: { login: string; senha: string }) {
    await this.userService.findOne(signInDto.login).then((user) => {
      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }
    });

    return await this.userService.signIn(signInDto.login, signInDto.senha);
  }
}
