import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript'
import { User } from 'src/users/user.model'
import { UserWorkspaces } from './user-workspaces.model'
import { Folder } from 'src/folder/folder.model'

interface IWorkspaceCreationAttrs {
  name: string
}

@Table({ tableName: 'workspaces' })
export class Workspace extends Model<Workspace, IWorkspaceCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  name: string

  @BelongsToMany(() => User, () => UserWorkspaces)
  users: User[]

  @HasMany(() => Folder)
  folders: Folder[]
}
