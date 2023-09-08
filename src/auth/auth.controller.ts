import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dto/loginUser.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  async createUser(@Body() createUserDto) {
    const user = await this.authService.register(createUserDto)

    return user
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Res() res, @Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.authService.login(loginUserDto)

      if (!user) {
        throw new BadRequestException('No user with such credintails')
      }

      res.status(HttpStatus.OK).json(user).send()
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json(err).send()
    }
  }
}
