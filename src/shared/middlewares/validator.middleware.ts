import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validatorMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  errors.isEmpty() ? next() : res.status(400).json({ errors: errors.array() });
};