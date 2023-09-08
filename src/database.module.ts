import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './users/user.model'
import { Workspace } from './workspace/workspace.model'
import { UserWorkspaces } from './workspace/user-workspaces.model'
import { Folder } from './folder/folder.model'
import { File } from './file/file.model'

// ENV vars do not work TODO: delete mocks var

const databaseProviders = [
  SequelizeModule.forRoot({
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'root',
    database: process.env.POSTGRES_DB || 'storage-db',
    models: [User, Workspace, UserWorkspaces, Folder, File],
    autoLoadModels: true,
  }),
]

@Module({
  imports: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
