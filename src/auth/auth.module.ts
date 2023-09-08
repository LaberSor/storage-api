import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from 'src/users/user.module'
import { JwtModule } from '@nestjs/jwt'
import { WorkspaceModule } from 'src/workspace/workspace.module'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    WorkspaceModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: /* process.env.PRIVATE_KEY || */ 'SECRET',
      signOptions: {
        expiresIn: '8h',
      },
    }),
  ],
})
export class AuthModule {}
