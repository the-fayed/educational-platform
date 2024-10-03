import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { NextFunction } from "express";

import { IUser, UserRole } from "./user.interface";

export const User = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 32,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            default: UserRole.USER,
            enum: [UserRole.ADMIN, UserRole.USER],
        },
        active: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

User.pre("save", async function (next: NextFunction): Promise<void> {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

User.pre("updateOne", async function (next: NextFunction): Promise<void> {
    const obj = this.getUpdate();
    "password" in obj
        ? (obj.password = await bcrypt.hash(obj.password, 12))
        : null;
    next();
});

export const UserModel = mongoose.model<IUser>("User", User);
