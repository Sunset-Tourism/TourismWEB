import { Controller, Get } from '@nestjs/common';
import { ExploreService } from './explore.service';

@Controller('explore')
export class ExploreController {
  constructor(private readonly exploreService: ExploreService) {}

  @Get()
  getExplore(): { places: Array<Record<string, unknown>> } {
    return this.exploreService.getExplore();
  }
}
