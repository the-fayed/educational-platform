import express from "express";

import levelRouter  from "./levels/level.routes";

export const router = (app: express.Application): void => {
  app.use('/api/v1/levels', levelRouter);
};