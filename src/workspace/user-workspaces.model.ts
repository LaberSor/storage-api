import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript'
import { User } from 'src/users/user.model'
import { Workspace } from './workspace.model'

@Table({ tableName: 'user_workspaces', createdAt: false, updatedAt: false })
export class UserWorkspaces extends Model<UserWorkspaces> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number

  @ForeignKey(() => Workspace)
  @Column({ type: DataType.INTEGER })
  workspaceId: number
}
