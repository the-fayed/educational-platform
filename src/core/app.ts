import express from "express";
import morgan from "morgan";
import cors from "cors";

import { ApiError, globalErrorHandler } from "../shared";

const app: express.Application = express();

app.use(cors());
app.options("*", cors());

app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: true, limit: "30kb" }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`application environment: ${process.env.NODE_ENV}`);
}

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Educational Platform API");
});

app.use(
    "*",
    (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        next(new ApiError(`route ${req.originalUrl} not found`, 404));
    }
);

app.use(globalErrorHandler);

export default app;
