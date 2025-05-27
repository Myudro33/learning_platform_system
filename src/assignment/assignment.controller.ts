import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { JwtGuard } from '../auth/guard';
import { InstructorGuard } from '../auth/guard/instructor.guard';
import { StudentGuard } from '../auth/guard/student.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../file-upload/file-upload.service';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@Controller('')
@ApiTags('Assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}
  @UseGuards(JwtGuard, InstructorGuard)
  @Post('/courses/:id/assignments')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create assignments' })
  @ApiResponse({ status: 201, description: 'assignment created' })
  create(@Param('id') id: string, @Body() dto: CreateAssignmentDto) {
    return this.assignmentService.createAssignment(+id, dto);
  }
  @Get('/courses/:id/assignments')
  @ApiOperation({ summary: 'get assignments' })
  @ApiResponse({ status: 200, description: 'assignments fetched' })
  getAssignments(@Param('id') id: string) {
    return this.assignmentService.getAssignments(+id);
  }
  @UseGuards(JwtGuard, StudentGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'submit assignment' })
  @ApiResponse({ status: 201, description: 'assignment submitted' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Put('/assignments/:id/submit')
  @UseInterceptors(
    FileInterceptor('files', new FileUploadService().getMulterOptions('files')),
  )
  submit(
    @Param('id') id: string,
    @UploadedFile() files: Express.Multer.File,
    @GetUser() user: User,
  ) {
    return this.assignmentService.submit(+id, files, user);
  }
  @UseGuards(JwtGuard, InstructorGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get submissions' })
  @ApiResponse({ status: 200, description: 'get submitted assignments' })
  @Get('/assignments/:id/submissions')
  getSubmitedSubmissions(@Param('id') id: string) {
    return this.assignmentService.getSubmitedSubmissions(+id);
  }
}
