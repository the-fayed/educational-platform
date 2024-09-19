import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error";

const sendErrorInProd = (error: ApiError, res: Response) => {
  res.status(error.statuscode).json({
    status: error.status,
    message: error.message
  });
};

const sendErrorInDev = (error: ApiError, res: Response) => {
  res.status(error.statuscode).json({
    status: error.status,
    message: error.message,
    stack: error.stack
  });
};

export const globalErrorHandler = (error: ApiError, req: Request, res: Response, next: NextFunction) => {
  error.statuscode = error.statuscode || 500;
  error.status = error.status || 'error';
  process.env.NODE_ENV === 'development' ? sendErrorInDev(error, res) : sendErrorInProd(error, res);
};

