import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import JwtConfigartion from '../../../config/jwt.config';
import { REQUEST_USER_KEY } from '../../../constants/iam.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(JwtConfigartion.KEY)
    private readonly jwtConfigartion: ConfigType<typeof JwtConfigartion>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeaders(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfigartion,
      );
      request[REQUEST_USER_KEY] = payload;

      console.log('payload', payload);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }
  private extractTokenFromHeaders(request: Request): string | undefined {
    const [, token] = request.headers.authorization?.split(' ') ?? [];

    return token;
  }
}
