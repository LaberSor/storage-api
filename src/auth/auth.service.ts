import { User } from 'src/users/user.model'
import { UserService } from '../users/user.service'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto) {
    let user = await this.userService.getUserByEmail(dto.email)

    if (user) {
      throw new Error('User with such email already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(dto.password, salt)

    user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    })

    return `${dto.email} created successfully!`
  }

  async login(dto) {
    try {
      const user = await this.userService.getUserByEmail(dto.email)

      if (!user) {
        return null
      }

      const isPasswordValid = await bcrypt.compare(dto.password, user.password)

      if (!isPasswordValid) {
        return null
      }

      return this.generateToken(user)
    } catch (err) {
      console.log(err)
    }
  }

  async generateToken(user: User) {
    try {
      const payload = { email: user.email, id: user.id }

      return { token: this.jwtService.sign(payload) }
    } catch (err) {
      console.log(err)
    }
  }
}
