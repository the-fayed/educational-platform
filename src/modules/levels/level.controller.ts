import asyncHandler from "express-async-handler";

import {
    CreateLevelDto,
    DeleteLevelDto,
    UpdateLevelDto,
    GetLevelDto,
} from "./level.interfaces";
import { LevelService } from "./level.service";
import { ApiError } from "../../shared";

export class LevelController {
    private LevelService: LevelService;

    constructor() {
        this.LevelService = new LevelService();
    }

    getAllLevels = asyncHandler(async (req, res, next) => {
        const levels = await this.LevelService.getAllLevels();
        if (!levels) {
            next(new ApiError("no levels found!", 403));
        }
        res.status(200).json({
            status: "success",
            data: levels,
        });
    });

    getLevel = asyncHandler(async (req, res, next) => {
        const dto: GetLevelDto = { id: req.params.id as string };
        const level = await this.LevelService.getLevel(dto.id);
        if (!level) {
            next(new ApiError("no level found!", 404));
        }
        res.status(200).json({
            status: "success",
            data: level,
        });
    });

    createLevel = asyncHandler(async (req, res, next) => {
        const createLevelDto: CreateLevelDto = { name: req.body.name };
        const level = await this.LevelService.createLevel(createLevelDto.name);
        if (!level) {
            next(new ApiError("could not create level", 400));
        }
        res.status(201).json({
            status: "success",
            message: "Level created successfully!",
            data: level,
        });
    });

    updateLevel = asyncHandler(async (req, res, next) => {
        const dto: UpdateLevelDto = { id: req.params.id, name: req.body.name };
        const level = await this.LevelService.updateLevel(dto.id, dto.name);
        if (!level) {
            next(new ApiError("Internal server error", 500));
        }
        res.status(200).json({
            status: "success",
            message: "Level updated successfully!",
            data: level,
        });
    });

    deleteLevel = asyncHandler(async (req, res, next) => {
        const dto: DeleteLevelDto = { id: req.params.id };
        await this.LevelService.deleteLevel(dto.id);
        res.status(204).json({
            status: "success",
            message: "Level deleted successfully!",
        });
    });
}
