import { Body, Controller, Param, Put } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { UpdateSubmissionDto } from './dto/submission-update.dto';

@Controller('submission')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}
  @Put('/:id/grade')
  setGrade(@Body() body: UpdateSubmissionDto, @Param('id') id: string) {
    return this.submissionService.setGrade(body, +id);
  }
}
