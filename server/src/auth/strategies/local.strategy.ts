import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }
  public async validate(email: string, password: string) {
    const user = this.authService.validate(email, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
