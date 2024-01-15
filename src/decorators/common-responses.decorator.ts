import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiCommonResponses() {
  return applyDecorators(
    ApiResponse({ status: 401, description: 'Não autorizado' }),
    ApiResponse({ status: 403, description: 'Acesso negado' }),
    ApiResponse({ status: 500, description: 'Erro interno' }),
  );
}
