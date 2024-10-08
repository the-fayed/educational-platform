import { ILevel, ILevelService } from "./level.interface";
import { levelModel as Level } from "./level.model";
import { ApiError } from "../../shared";

export class LevelService implements ILevelService {
    async getAllLevels(): Promise<ILevel[]> {
        const levels = await Level.find();
        if (!levels) {
            throw new ApiError("no levels found", 403);
        }
        return levels;
    }
    async getLevel(id: string): Promise<ILevel> {
        const level = await Level.findById(id);
        if (!level) {
            throw new ApiError("no level found", 404);
        }
        return level;
    }
    async createLevel(name: string): Promise<ILevel> {
        const level = (await Level.create({ name })) as ILevel;
        if (!level) {
            throw new ApiError("could not create level", 400);
        }
        return level;
    }
    async updateLevel(id: string, name: string): Promise<ILevel> {
        const level = await Level.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );
        if (!level) {
            throw new ApiError("Level not found!", 404);
        }
        return level;
    }
    async deleteLevel(id: string): Promise<void> {
        const level = await Level.findByIdAndDelete(id);
        if (!level) {
            throw new ApiError("Level not found!", 404);
        }
    }
}
