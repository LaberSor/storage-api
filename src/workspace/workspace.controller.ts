import { WorkspaceService } from 'src/workspace/workspace.service'
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common'
import { Headers } from '@nestjs/common'

@Controller('workspace')
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @Post('create')
  @HttpCode(201)
  async createWorkspace(@Body() createWorspaceDto) {
    const workspace = await this.workspaceService.createWorkspace(
      createWorspaceDto,
    )

    return workspace
  }

  @Get('all')
  @HttpCode(200)
  async getAllWorkspaces(@Headers() headers) {
    const { from: email } = headers
    const workspace = await this.workspaceService.getAllWorkspacesByUser(email)

    return workspace
  }
}
