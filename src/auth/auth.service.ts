import { User } from 'src/users/users.model'
import { UsersService } from './../users/users.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto) {
    let user = await this.usersService.getUserByEmail(dto.email)

    if (user) {
      throw new HttpException(
        'User with such email already exists',
        HttpStatus.BAD_REQUEST,
      )
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(dto.password, salt)

    user = await this.usersService.createUser({
      ...dto,
      password: hashPassword,
    })

    return this.generateToken(user)
  }

  async login(dto) {
    const user = await this.usersService.getUserByEmail(dto.email)

    if (!user) {
      throw new HttpException(
        'No user with such credintails',
        HttpStatus.BAD_REQUEST,
      )
    }

    bcrypt.compare(dto.password, user.password, (err, res) => {
      if (!res || err) {
        throw new HttpException(
          'No user with such credintails',
          HttpStatus.BAD_REQUEST,
        )
      }
    })

    return this.generateToken(user)
  }

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id }

    return { token: this.jwtService.sign(payload) }
  }
}
