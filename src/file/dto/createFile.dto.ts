import { IFileCreationAttrs } from '../file.model'

export interface CreateFileDto {
  user: string
  file: IFileCreationAttrs
}
