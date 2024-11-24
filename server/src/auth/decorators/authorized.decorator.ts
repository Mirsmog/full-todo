import { User } from '@/users/entities/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Authorized = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data] : user;
  },
);
