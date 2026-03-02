import { ExploreService } from './explore.service';
export declare class ExploreController {
    private readonly exploreService;
    constructor(exploreService: ExploreService);
    getExplore(): {
        places: Array<Record<string, unknown>>;
    };
}
