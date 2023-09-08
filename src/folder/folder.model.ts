import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript'
import { Workspace } from 'src/workspace/workspace.model'

interface IFolderCreationAttrs {
  name: string
  workspaceId: string
}

@Table({ tableName: 'folders' })
export class Folder extends Model<Folder, IFolderCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string

  @ForeignKey(() => Workspace)
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  workspaceId: string

  @BelongsTo(() => Workspace)
  workspace: Workspace
}
