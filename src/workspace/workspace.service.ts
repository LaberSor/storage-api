import { UserService } from 'src/users/user.service'
import { Injectable, forwardRef, Inject } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Workspace } from './workspace.model'
import { createWorkspaceDto } from './dto/createWorkspace.dto'

@Injectable()
export class WorkspaceService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    @InjectModel(Workspace) private workspaceRepository: typeof Workspace,
  ) {}

  async createWorkspace(dto: createWorkspaceDto) {
    const workspace = await this.workspaceRepository.create(dto)

    return workspace
  }

  async getWorkspaceByName(name: string) {
    const workspace = await this.workspaceRepository.findOne({
      where: { name },
      include: { all: true },
    })

    return workspace
  }

  async getAllWorkspaces() {
    const workspaces = await this.workspaceRepository.findAll({
      include: { all: true },
    })

    return workspaces
  }

  async getAllWorkspacesByUser(email) {
    try {
      const user = await this.userService.getUserByEmail(email)

      const workspaces = await this.workspaceRepository.findAll({
        where: { id: user.id },
        include: { all: true },
      })

      const mappedWorkspaces = workspaces.map((item) => {
        delete item.users
        return item
      })

      return mappedWorkspaces
    } catch (err) {
      console.log(err)
    }
  }

  async deleteWorkspaceByName(name: string) {
    try {
      const workspaceToDelete = await this.workspaceRepository.findOne({
        where: { name },
        include: { all: true },
      })

      await workspaceToDelete.destroy()
    } catch (err) {
      console.log(err)
    }
  }
}
