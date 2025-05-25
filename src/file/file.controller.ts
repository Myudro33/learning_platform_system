import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../file-upload/file-upload.service';
import { CreateFileDto } from './dto/create-file.dto';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('files')
@ApiTags('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private fileUploadService: FileUploadService,
  ) {}
  @Post('/upload')
  @ApiOperation({ summary: 'upload files for lectures' })
  @ApiResponse({ status: 201, description: 'files uploaded successfully' })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary',
        },
        lectureId: { type: 'string', default: '1' },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor(
      'files',
      5,
      new FileUploadService().getMulterOptions('files'),
    ),
  )
  create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: CreateFileDto,
    @GetUser() user: User,
  ) {
    const validFiles = files.filter(() =>
      this.fileUploadService.getMulterOptions('files'),
    );
    return this.fileService.create(dto, validFiles, user);
  }
  @Get('/:id')
  @ApiOperation({ summary: 'get lecture files' })
  @ApiResponse({ status: 200, description: 'files fetched successfully' })
  getFiles(@Param('id') id: number) {
    return this.fileService.getFiles(+id);
  }
}
