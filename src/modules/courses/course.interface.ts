import mongoose, { Document } from "mongoose";

export interface ICourse extends Document {
    name: String;
    level: mongoose.Schema.Types.ObjectId | {
        _id: mongoose.Schema.Types.ObjectId;
        name: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface ICourseService {
    createCourse(dto: CreateCourseDto): Promise<ICourse>;
    updateCourse(dto: updateCourseDto): Promise<ICourse>;
    getCourse(id: string): Promise<ICourse>;
    deleteCourse(id: string): Promise<void>;
    getCourses(): Promise<ICourse[]>;
}

export interface CreateCourseDto {
    name: string;
    level: string;
}

export interface updateCourseDto {
    id: string;
    name: string;
};
