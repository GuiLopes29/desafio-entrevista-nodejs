import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../user/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
  ) {}

  generateToken(usuario: Usuario): string {
    const payload = {
      login: usuario.login,
      sub: usuario.id,
      nome: usuario.nome,
      cpf: usuario.cpf,
      tipo: usuario.tipo,
    };

    return this.jwtService.sign(payload);
  }

  async validateUserById(login: string): Promise<Usuario> {
    return this.userRepository.findOne({ where: { login } });
  }
}
