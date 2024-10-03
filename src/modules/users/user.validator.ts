import { check } from "express-validator";

import { validatorMiddleware } from "../../shared";
import { UserModel as User } from "./user.model";

export const validateCreateUser = [
    check("name")
        .notEmpty()
        .withMessage("name is required!")
        .isLength({ min: 3, max: 32 })
        .withMessage("name must be between 3 and 32 characters long!"),
    check("email")
        .notEmpty()
        .withMessage("email is required!")
        .isEmail()
        .withMessage("invalid email!")
        .custom(async (value: string): Promise<boolean> => {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error("email already exists!");
            }
            return true;
        }),
    check("password")
        .notEmpty()
        .withMessage("password is required!")
        .isLength({ min: 8 })
        .withMessage("password must be at least 8 characters long!")
        .isStrongPassword()
        .withMessage(
            "password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        ),
    validatorMiddleware,
];

export const validateGetUser = [
    check("id")
        .notEmpty()
        .withMessage("user id is required!")
        .isMongoId()
        .withMessage("invalid user id")
        .custom(async (value: string): Promise<boolean> => {
            const user = await User.findById(value);
            if (!user) {
                throw new Error("user not found!");
            }
            return true;
        }),
    validatorMiddleware,
];

export const validateUpdateUser = [
    check("id")
        .notEmpty()
        .withMessage("user id is required!")
        .isMongoId()
        .withMessage("invalid user id")
        .custom(async (value: string): Promise<boolean> => {
            const user = await User.findById(value);
            if (!user) {
                throw new Error("user not found!");
            }
            return true;
        }),
    check("name").optional().isLength({ min: 3, max: 32 }),
    validatorMiddleware,
];

export const validateDeleteUser = [
    check("id")
        .notEmpty()
        .withMessage("user id is required!")
        .isMongoId()
        .withMessage("invalid user id")
        .custom(async (value: string): Promise<boolean> => {
            const user = await User.findById(value);
            if (!user) {
                throw new Error("user not found!");
            }
            return true;
        }),
    validatorMiddleware,
];
