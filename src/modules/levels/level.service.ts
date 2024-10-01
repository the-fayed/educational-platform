import { ILevel, ILevelService } from "./level.interfaces";
import { levelModel } from "./level.model";
import { ApiError } from "../../shared";

export class LevelService implements ILevelService {
    async getAllLevels(): Promise<ILevel[]> {
        const levels = await levelModel.find();
        if (!levels) {
            throw new ApiError("no levels found", 403);
        }
        return levels;
    }
    async getLevel(id: string): Promise<ILevel> {
        const level = await levelModel.findById(id);
        if (!level) {
            throw new ApiError("no level found", 404);
        }
        return level;
    }
    async createLevel(name: string): Promise<ILevel> {
        const level = (await levelModel.create({ name })) as ILevel;
        if (!level) {
            throw new ApiError("could not create level", 400);
        }
        return level;
    }
    async updateLevel(id: string, name: string): Promise<ILevel> {
        const level = await levelModel.findByIdAndUpdate(
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
        const level = await levelModel.findByIdAndDelete(id);
        if (!level) {
            throw new ApiError("Level not found!", 404);
        }
    }
}
