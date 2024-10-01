import { check } from "express-validator";

import { validatorMiddleware } from "../../shared";
import { levelModel } from "./level.model";

export const validateCreateLevel = [
    check("name")
        .notEmpty()
        .withMessage("level name is required!")
        .isLength({ min: 3, max: 20 })
        .withMessage("level name must be between 3 and 20 characters long!")
        .custom(async (value: string) => {
            const level = await levelModel.findOne({
                name: value.charAt(0).toUpperCase() + value.slice(1),
            });
            if (level) {
                throw new Error("level already exists!");
            }
            return true;
        }),
    validatorMiddleware,
];

export const validateGetLevel = [
    check("id")
        .notEmpty()
        .withMessage("level id is required!")
        .isMongoId()
        .withMessage("invalid level id")
        .custom(async (value: string) => {
            const level = await levelModel.findById(value);
            if (!level) {
                throw new Error("level not found!");
            }
            return true;
        }),
    validatorMiddleware,
];

export const validateUpdateLevel = [
    check("id")
        .notEmpty()
        .withMessage("level id is required!")
        .isMongoId()
        .withMessage("invalid level id")
        .custom(async (value: string) => {
            const level = await levelModel.findById(value);
            if (!level) {
                throw new Error("level not found!");
            }
            return true;
        }),
    check("name")
        .notEmpty()
        .withMessage("level name is required!")
        .isLength({ min: 3, max: 20 })
        .withMessage("level name must be between 3 and 20 characters long!")
        .custom(async (value: string) => {
            const level = await levelModel.findOne({
                name: value.charAt(0).toUpperCase() + value.slice(1),
            });
            if (level) {
                throw new Error("level already exists!");
            }
            return true;
        }),
    validatorMiddleware,
];

export const validateDeleteLevel = [
    check("id")
        .notEmpty()
        .withMessage("level id is required!")
        .isMongoId()
        .withMessage("invalid level id")
        .custom(async (value: string) => {
            const level = await levelModel.findById(value);
            if (!level) {
                throw new Error("level not found!");
            }
            return true;
        }),
    validatorMiddleware,
];
