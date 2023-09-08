import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript'
import { UserWorkspaces } from 'src/workspace/user-workspaces.model'
import { Workspace } from 'src/workspace/workspace.model'

interface IUserCreationAttrs {
  email: string
  password: string
  avatarUrl?: string | null
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string

  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  @Column({ type: DataType.STRING, allowNull: true })
  avatarUrl: string | null

  @BelongsToMany(() => Workspace, () => UserWorkspaces)
  workspaces: Workspace[]
}
