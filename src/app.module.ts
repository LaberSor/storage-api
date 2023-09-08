import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './users/user.module'
import { LoggerMiddleware } from './common/logger.middleware'
import { WorkspaceModule } from './workspace/workspace.module'
import { FolderModule } from './folder/folder.module'
import { FileModule } from './file/file.module'
import { DashboardModule } from './dashboard/dashboard.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    WorkspaceModule,
    FolderModule,
    FileModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude('auth/(.*)').forRoutes('*')
  }
}
