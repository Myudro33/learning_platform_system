import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { UpdateSubmissionDto } from './dto/submission-update.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { InstructorGuard } from 'src/auth/guard/instructor.guard';

@Controller('submission')
@ApiTags('submission')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}
  @UseGuards(JwtGuard, InstructorGuard)
  @Put('/:id/grade')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'set grade' })
  @ApiResponse({ status: 200, description: 'grade updated' })
  setGrade(@Body() body: UpdateSubmissionDto, @Param('id') id: string) {
    return this.submissionService.setGrade(body, +id);
  }
}
