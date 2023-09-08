import { UserService } from 'src/users/user.service'
import { WorkspaceService } from 'src/workspace/workspace.service'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { File } from './file.model'

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File) private readonly fileRepository: typeof File,
    private readonly workspaceService: WorkspaceService,
    private readonly userService: UserService,
  ) {}

  async createFile(createFileDto) {
    let folder = null
    const workspace = await this.workspaceService.getWorkspaceByName(
      createFileDto.workspace,
    )

    if (createFileDto.folder) {
      folder = workspace.folders.find(
        (folder) => folder.name === createFileDto.folder,
      )
    }

    const file = await this.fileRepository.create({
      ...createFileDto.file,
      workspaceId: workspace.id,
      folderId: folder?.id || null,
    })

    return file
  }

  async getAllFilesByUser(email) {
    const user = await this.userService.getUserByEmail(email)
  }

  async deleteFile(email, name) {
    const user = await this.userService.getUserByEmail(email)

    const file = await this.fileRepository.findOne({ where: { name } })

    await file.destroy()
  }
}
