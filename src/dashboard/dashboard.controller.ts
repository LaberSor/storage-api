import { DashboardService } from './dashboard.service'
import { Controller, Get, Headers, HttpCode } from '@nestjs/common'

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @HttpCode(200)
  async getDashboardData(@Headers() headers) {
    const { from: email } = headers
    const dashboard = await this.dashboardService.getDashboardInfoByEmail(email)

    return dashboard
  }
}
