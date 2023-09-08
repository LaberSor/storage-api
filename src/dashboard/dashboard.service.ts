import { WorkspaceService } from 'src/workspace/workspace.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DashboardService {
  constructor(private workspaceService: WorkspaceService) {}

  async getDashboardInfoByEmail(email) {
    const workspaces = await this.workspaceService.getAllWorkspacesByUser(email)

    const mappedWorkspaces = workspaces.map((item) => {
      delete item.users
      return item
    })

    return {
      workspaces: mappedWorkspaces,
    }
  }
}
