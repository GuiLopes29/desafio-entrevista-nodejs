import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    return expect(new AuthGuard(new JwtService())).toBeDefined();
  });
});
