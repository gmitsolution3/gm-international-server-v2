import { Controller, Get } from '@nestjs/common';
import { ActivitiesService } from './activities.service';


// api
// get: localhost:8080/activities/api/v1/image-gallery/video-gallery

@Controller('activities/api/v1')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  // GET ALL MEDIA ACTIVITIES
  // api will be -> activities/api/v1/dashboard
  @Get('image-gallery/video-gallery')
  getDashboardData() {
    return this.activitiesService.getDashboardData();
  }
}
