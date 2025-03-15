import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  //   Res,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enums';
import { RefreshTokenDto } from './dto/refresh-token.dto';
// import { Response } from 'express';

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('sign-up')
  async signUp(@Body() signInDto: SignUpDto) {
    return this.authService.signUp(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshTokens(refreshTokenDto);
  }

  // Cookie-based authentication

  //   @HttpCode(HttpStatus.OK)
  //   @Post('sign-in')
  //   async signIn(
  //     @Res({ passthrough: true }) response: Response,
  //     @Body() signInDto: SignInDto,
  //   ) {
  //     const accessToken = await this.authService.signIn(signInDto);
  //     response.cookie('access_token', accessToken, {
  //       httpOnly: true,
  //       secure: true,
  //       sameSite: 'none',
  //     });
  //   }
}
