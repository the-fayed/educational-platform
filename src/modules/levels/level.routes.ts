import { Router } from "express";

import {
    validateCreateLevel,
    validateDeleteLevel,
    validateGetLevel,
    validateUpdateLevel,
} from "./level.validators";
import { LevelController } from "./level.controller";

const router: Router = Router();
const levelController = new LevelController();

router
    .route("/")
    .get(levelController.getAllLevels)
    .post(validateCreateLevel, levelController.createLevel);
router
    .route("/:id")
    .get(validateGetLevel, levelController.getLevel)
    .put(validateUpdateLevel, levelController.updateLevel)
    .delete(validateDeleteLevel, levelController.deleteLevel);

export default router;
