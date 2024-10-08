import { Router } from "express";

// import {
//     validateCreateCourse,
//     validateDeleteCourse,
//     validateGetCourse,
//     validateGetCourses,
//     validateUpdateCourse,
// } from "./course.validator";
import { CourseController } from "./course.controller";


const router: Router = Router({ mergeParams: true });
const courseController = new CourseController();

router
    .route("/")
    .post( courseController.createCourse)
    .get( courseController.getCourses);

router
    .route("/:id")
    .get( courseController.getCourse)
    .put( courseController.updateCourse)
    .delete( courseController.deleteCourse);

export default router;
