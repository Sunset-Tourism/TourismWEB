"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExploreModule = void 0;
const common_1 = require("@nestjs/common");
const explore_controller_1 = require("./explore.controller");
const explore_service_1 = require("./explore.service");
let ExploreModule = class ExploreModule {
};
exports.ExploreModule = ExploreModule;
exports.ExploreModule = ExploreModule = __decorate([
    (0, common_1.Module)({
        controllers: [explore_controller_1.ExploreController],
        providers: [explore_service_1.ExploreService],
    })
], ExploreModule);
//# sourceMappingURL=explore.module.js.map