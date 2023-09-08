import { Module } from '@nestjs/common'
import { FileController } from './file.controller'
import { FileService } from './file.service'
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module'
import { File } from './file.model'
import { UserModule } from 'src/users/user.module'
import { WorkspaceModule } from 'src/workspace/workspace.module'

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [SequelizeModule.forFeature([File]), UserModule, WorkspaceModule],
  exports: [FileService],
})
export class FileModule {}
