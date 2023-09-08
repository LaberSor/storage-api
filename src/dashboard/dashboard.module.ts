import { Module } from '@nestjs/common'
import { DashboardController } from './dashboard.controller'
import { DashboardService } from './dashboard.service'
import { WorkspaceModule } from 'src/workspace/workspace.module'

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [WorkspaceModule],
})
export class DashboardModule {}
