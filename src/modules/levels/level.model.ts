import mongoose from "mongoose";

import { ILevel } from "./level.interface";
import { NextFunction } from "express";

export const Level = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minLength: 3,
            maxLength: 20,
        },
    },
    { timestamps: true }
);

Level.pre("save", function (next: NextFunction): void {
    this.set(
        "name",
        this.get("name").charAt(0).toUpperCase() + this.get("name").slice(1)
    );
    next();
});

export const levelModel = mongoose.model<ILevel>("Level", Level);
