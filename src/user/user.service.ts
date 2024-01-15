import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Usuario } from './entities';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  findOne(login: string): Promise<Usuario> {
    console.log(login);
    return this.userRepository.findOne({ where: { login } });
  }

  async signIn(login: string, pass: string) {
    const findUser = await this.userRepository.findOne({
      where: { login },
    });

    if (!findUser) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(pass, findUser.senha);

    if (!isMatch) {
      throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      login: findUser.login,
      sub: findUser.id,
      nome: findUser.nome,
      cpf: findUser.cpf,
      tipo: findUser.tipo,
    };

    return {
      access_token: await this.jwtService.sign(payload),
    };
  }

  async create(user: Usuario): Promise<Usuario> {
    const generateToken = () => {
      const payload = {
        login: user.login,
        sub: user.id,
        nome: user.nome,
        cpf: user.cpf,
        tipo: user.tipo,
      };

      return this.jwtService.sign(payload);
    };
    const salt = await bcrypt.genSalt();
    user.senha = await bcrypt.hash(user.senha, salt);

    return this.userRepository.save(user).then((user) => {
      return { ...user, token: generateToken() };
    });
  }

  async update(login: string, user: Usuario): Promise<void> {
    await this.userRepository.update({ login }, user);
  }

  async remove(login: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { login },
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    user.ativo = false;
    await this.userRepository.save(user);
  }
}
