import asyncHandler from "express-async-handler";

import { CreateCourseDto, updateCourseDto } from "./course.interface";
import { CourseService } from "./course.service";
import { ApiError } from "../../shared";

export class CourseController {
    private courseService: CourseService;

    constructor() {
        this.courseService = new CourseService();
    }

    createCourse = asyncHandler(async (req, res, next) => {
        const dto: CreateCourseDto = {
            name: req.body.name,
            level: req.params.levelId,
        };

        const course = await this.courseService.createCourse(dto);
        if (!course) {
            next(new ApiError("could not create course", 400));
        }

        res.status(201).json({
            status: "success",
            data: course,
        });
    });

    getCourses = asyncHandler(async (req, res, next) => {
        const levelId: string | {} = req.params.levelId || {};
        const courses = await this.courseService.getCourses(levelId);

        if (!courses) {
            next(new ApiError("No content", 204));
        }

        res.status(200).json({
            status: "success",
            data: courses,
        });
    });

    getCourse = asyncHandler(async (req, res, next) => {
        const id: string = req.params.id;
        const course = await this.courseService.getCourse(id);
        if (!course) {
            next(new ApiError("Course not found!", 404));
        }
        res.status(200).json({
            status: "success",
            data: course,
        });
    });

    updateCourse = asyncHandler(async (req, res, next) => {
        const dto: updateCourseDto = {
            id: req.params.id,
            name: req.body.name,
        };
        const course = await this.courseService.updateCourse(dto);
        if (!course) {
            next(new ApiError("Course not found!", 404));
        }
        res.status(200).json({
            status: "success",
            data: course,
        });
    });

    deleteCourse = asyncHandler(async (req, res, next) => {
        const id: string = req.params.id;
        await this.courseService.deleteCourse(id);
        res.sendStatus(204);
    });
}
