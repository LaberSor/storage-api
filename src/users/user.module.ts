import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './user.model'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { Workspace } from 'src/workspace/workspace.model'
import { UserWorkspaces } from 'src/workspace/user-workspaces.model'
import { WorkspaceModule } from 'src/workspace/workspace.module'

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User, Workspace, UserWorkspaces]),
    forwardRef(() => WorkspaceModule),
  ],
  exports: [UserService],
})
export class UserModule {}
