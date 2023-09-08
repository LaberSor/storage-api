import { Module, forwardRef } from '@nestjs/common'
import { WorkspaceController } from './workspace.controller'
import { WorkspaceService } from './workspace.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/users/user.model'
import { Workspace } from './workspace.model'
import { UserWorkspaces } from './user-workspaces.model'
import { UserModule } from 'src/users/user.module'
import { Folder } from 'src/folder/folder.model'

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  imports: [
    SequelizeModule.forFeature([Workspace, User, UserWorkspaces, Folder]),
    forwardRef(() => UserModule),
  ],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
