import express from "express";

import courseRouter from "./courses/course.routes";
import levelRouter  from "./levels/level.routes";
import userRouter  from "./users/user.routes";

export const router = (app: express.Application): void => {
  app.use('/api/v1/courses', courseRouter);
  app.use('/api/v1/levels', levelRouter);
  app.use('/api/v1/users', userRouter);
};