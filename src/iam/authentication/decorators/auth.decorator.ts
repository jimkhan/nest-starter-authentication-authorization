import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth-type.enums';

export const AUTH_TTYPE_KEY = 'authType';

export const Auth = (...authType: AuthType[]) =>
  SetMetadata(AUTH_TTYPE_KEY, authType);
