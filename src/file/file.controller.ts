import {
  Body,
  Controller,
  HttpCode,
  Post,
  Headers,
  Delete,
} from '@nestjs/common'
import { FileService } from './file.service'

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/create')
  @HttpCode(201)
  async createFile(@Headers() headers, @Body() body) {
    const { from: email } = headers
    const { workspace, folder, file } = body

    const newFile = await this.fileService.createFile({
      user: email,
      workspace,
      file,
      folder,
    })

    return newFile
  }

  @Delete('/delete')
  @HttpCode(200)
  async deleteFile(@Headers() headers, @Body() body) {
    const { from: email } = headers
    const { file: fileName } = body

    await this.deleteFile(email, fileName)
  }
}
