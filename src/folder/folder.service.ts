import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Folder } from './folder.model'

@Injectable()
export class FolderService {
  constructor(@InjectModel(Folder) private folderRepository: typeof Folder) {}

  async createFolder(dto) {
    const folder = await this.folderRepository.create(dto)

    return folder
  }

  async getFolderByName(name: string) {
    const folder = await this.folderRepository.findOne({
      where: { name },
      include: { all: true },
    })

    return folder
  }

  async getAllFolders() {
    const folders = await this.folderRepository.findAll({
      include: { all: true },
    })

    return folders
  }

  async deleteFolderByName(name: string) {
    try {
      const folderToDelete = await this.folderRepository.findOne({
        where: { name },
        include: { all: true },
      })

      await folderToDelete.destroy()
    } catch (err) {
      console.log(err)
    }
  }
}
