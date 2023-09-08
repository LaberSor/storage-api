import { WorkspaceService } from 'src/workspace/workspace.service'
import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './user.model'
import { createUserDto } from './dto/createUser.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @Inject(forwardRef(() => WorkspaceService))
    private workspaceService: WorkspaceService,
  ) {}

  async createUser(dto: createUserDto) {
    const user = await this.userRepository.create(dto)

    if (user) {
      const workspace = await this.workspaceService.createWorkspace({
        name: 'My Workspace',
      })

      await user.$set('workspaces', [workspace.id])
    }

    return user
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    })

    return user
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } })

    return users
  }
}
