import mongoose from "mongoose";

export interface ILevel extends mongoose.Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ILevelService {
    getAllLevels(): Promise<ILevel[]>;
    getLevel(id: string): Promise<ILevel>;
    createLevel(name: string): Promise<ILevel>;
    updateLevel(id: string, name: string): Promise<ILevel>;
    deleteLevel(id: string): Promise<void>;
}

export interface GetLevelDto {
    id: string;
}

export interface CreateLevelDto {
    name: string;
}

export interface UpdateLevelDto extends GetLevelDto, CreateLevelDto {}

export interface DeleteLevelDto extends GetLevelDto {}
