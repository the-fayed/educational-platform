import {
    CreateCourseDto,
    ICourse,
    ICourseService,
    updateCourseDto,
} from "./course.interface";
import { CourseModel as Course } from "./course.model";
import { ApiError } from "../../shared";

export class CourseService implements ICourseService {
    async createCourse(dto: CreateCourseDto): Promise<ICourse> {
        const course = (await Course.create({
            name: dto.name,
            level: dto.level,
        })) as ICourse;
        if (!course) {
            throw new ApiError("could not create course", 400);
        }
        return course;
    }
    async getCourse(id: string): Promise<ICourse> {
        const course = (await Course.findById(id)) as ICourse;
        if (!course) {
            throw new ApiError("no course found", 404);
        }
        return course;
    }
    async getCourses(levelId?: string | {}): Promise<ICourse[]> {
        const courses = (await Course.find({ level: levelId }).populate(
            "level",
            "-__v -createdAt -updatedAt -__v"
        )) as ICourse[];
        if (!courses) {
            throw new ApiError("no courses found", 404);
        }
        return courses;
    }
    async updateCourse(dto: updateCourseDto): Promise<ICourse> {
        const course = (await Course.findByIdAndUpdate(
            dto.id,
            { name: dto.name },
            { new: true }
        )) as ICourse;
        if (!course) {
            throw new ApiError("Course not found!", 404);
        }
        return course;
    }
    async deleteCourse(id: string): Promise<void> {
        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            throw new ApiError("Course not found!", 404);
        }
    }
}
