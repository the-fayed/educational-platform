import { Router } from "express";

import { UserController } from "./user.controller";
import {
    validateCreateUser,
    validateDeleteUser,
    validateUpdateUser,
    validateGetUser,
} from "./user.validator";

const router: Router = Router();
const userController = new UserController();

router
    .route("/")
    .get(userController.getUsers)
    .post(validateCreateUser, userController.createUser);

router
    .route("/:id")
    .get(validateGetUser, userController.getUser)
    .put(validateUpdateUser, userController.updateUser)
    .delete(validateDeleteUser, userController.deleteUser);

export default router;
