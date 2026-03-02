import { Injectable } from '@nestjs/common';

@Injectable()
export class ExploreService {
  getExplore(): { places: Array<Record<string, unknown>> } {
    return { places: [] };
  }
}
