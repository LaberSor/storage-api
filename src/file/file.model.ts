import { Table, Column, Model, DataType } from 'sequelize-typescript'

export interface IFileCreationAttrs {
  name: string
  size: number
  type: string
  workspaceId: string | null
  folderId: string
}

@Table({ tableName: 'files' })
export class File extends Model<File, IFileCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string

  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  size: number

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  type: string

  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  folderId: string

  @Column({ type: DataType.INTEGER, allowNull: true, unique: true })
  workspaceId: string | null
}
