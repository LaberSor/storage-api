import { JwtService } from '@nestjs/jwt'
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = this.extractTokenFromHeader(req)

      if (!token) {
        throw new UnauthorizedException()
      }

      const payload = this.jwtService.verify(token, {
        secret: /*  process.env.PRIVATE_KEY ||  */ 'SECRET',
      })

      if (!payload) {
        throw new UnauthorizedException()
      }

      req['user'] = payload

      next()
    } catch (err) {
      console.log(err)
      throw new UnauthorizedException()
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
