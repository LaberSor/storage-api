import { Module } from '@nestjs/common'
import { FolderService } from './folder.service'
import { FolderController } from './folder.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Folder } from './folder.model'
import { Workspace } from 'src/workspace/workspace.model'

@Module({
  providers: [FolderService],
  controllers: [FolderController],
  imports: [SequelizeModule.forFeature([Folder, Workspace])],
})
export class FolderModule {}
