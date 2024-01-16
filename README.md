## Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- NodeJS: Um ambiente de execução JavaScript construído no motor JavaScript V8 do Chrome.
- NestJS: Um framework Node.js progressivo para construir aplicações eficientes, confiáveis e escaláveis no lado do servidor.
- TypeScript: Um superconjunto tipado de JavaScript que compila para JavaScript simples.
- TypeOrm: Um ORM que pode ser executado no NodeJS e pode ser usado com TypeScript e JavaScript.
- MySQL: Um sistema de gerenciamento de banco de dados relacional de código aberto.
- JWT (JSON Web Tokens): Um meio compacto e seguro para URL de representar reivindicações a serem transferidas entre duas partes.
- Passport: Middleware de autenticação compatível com Express para Node.js.
- Bcrypt: Uma biblioteca para ajudá-lo a fazer hash de senhas.
- dotenv: Um módulo sem dependências que carrega variáveis de ambiente de um arquivo `.env` para `process.env`.

## Solicitações de Serviço

As seguintes solicitações de serviço estão disponíveis para o endpoint `estabelecimento`:

- `GET /estabelecimento/{cnpj}` - utilizado para buscar um ou varios estabelecimentos pelo cnpj ou todos os estabelecimentos via query
- `GET /estabelecimento/{cnpj}/estacionamentos` - utilizado para listar os estacionamentos do estabelecimento
- `POST /estabelecimento` - utilizando o body para enviar os dados do estabelecimento
- `POST /estabelecimento/{cnpj}/entrar` - utilizado para entrada de veiculos
- `POST /estabelecimento/{cnpj}/sair` - utilizado para saida de veiculos
- `PUT /estabelecimento/{cnpj}` - utilizado para atualizar os dados do estabelecimento
- `DELETE /estabelecimento/{cnpj}` - utilizado para desativar o estabelecimento

Para o endpoint `veiculo`:

- `GET /veiculo/{placa}` - utilizado para buscar um ou varios veiculos pela placa ou todos os veiculos via query
- `POST /veiculo` - utilizado para cadastrar um veiculo
- `PUT /veiculo/{placa}` - utilizado para atualizar os dados do veiculo
- `DELETE /veiculo/{placa}` - utilizado para desativar o veiculo

Para o endpoint `login`:

- `POST /user` - utilizado para criar um usuario
- `POST /user/login` - utilizado para realizar o login

As rotas também estão disponíveis via Swagger em `http://localhost:3000/swagger`.

## Configuração

Para executar a aplicação, você precisa configurar o seguinte:

1. Execute o Docker Compose para configurar os contêineres Docker necessários. Utilizando o comando `docker-compose up -d`.
2. Configure o arquivo `.env` com as seguintes variáveis:
   - `DATABASE_URL`: A URL do seu banco de dados.
   - `JWT_SECRET_KEY`: A chave secreta para JWT.

## Executando a Aplicação

1. Instale as dependências com `yarn`.
2. Execute a aplicação com `yarn start` ou `yarn start --watch`.

Certifique-se de que os contêineres Docker estão em execução e o arquivo `.env` está corretamente configurado antes de iniciar a aplicação.

### Executando os Testes

1. Instale as dependências com `yarn`.
2. Execute os testes com `yarn test`.

OBS: Os testes estão sendo executados em um banco de dados em memória, portanto, não é necessário configurar o arquivo `.env` para executar os testes. Alguns testes não foram implementados devido a alguns imprevistos pessoais, mas acredito que o que foi implementado já é o suficiente para demonstrar o conhecimento.
