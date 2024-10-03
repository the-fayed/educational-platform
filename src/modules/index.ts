import express from "express";

import levelRouter  from "./levels/level.routes";
import userRouter  from "./users/user.routes";

export const router = (app: express.Application): void => {
  app.use('/api/v1/levels', levelRouter);
  app.use('/api/v1/users', userRouter);
};