import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from './entities';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let service: UserService;
  let jwtService: JwtService;
  let userRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get(getRepositoryToken(Usuario));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user if one is found', async () => {
      const testUser: Usuario = {
        id: 1,
        nome: 'Test',
        cpf: '12345678910',
        endereco: 'testAddress',
        telefone: '123123123',
        login: 'testLogin',
        senha: 'testPassword',
        tipo: 0,
        ativo: true,
      };
      userRepository.findOne.mockResolvedValue(testUser);
      const user = await service.findOne('testLogin');
      expect(user).toEqual(testUser);
    });

    it('should return null if no user is found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      const user = await service.findOne('testLogin');
      expect(user).toBeNull();
    });
  });

  // Add similar blocks for signIn, create, update, and remove methods
});
