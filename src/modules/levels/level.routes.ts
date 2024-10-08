import { Router } from "express";

import {
    validateCreateLevel,
    validateDeleteLevel,
    validateGetLevel,
    validateUpdateLevel,
} from "./level.validators";
import { LevelController } from "./level.controller";
import { CourseController } from "../courses";

const router: Router = Router();
const levelController = new LevelController();
const courseController = new CourseController();

router
    .route("/")
    .get(levelController.getAllLevels)
    .post(validateCreateLevel, levelController.createLevel);
router
    .route("/:id")
    .get(validateGetLevel, levelController.getLevel)
    .put(validateUpdateLevel, levelController.updateLevel)
    .delete(validateDeleteLevel, levelController.deleteLevel);

router
    .route("/:levelId/courses")
    .get(courseController.getCourses)
    .post(courseController.createCourse);

export default router;
