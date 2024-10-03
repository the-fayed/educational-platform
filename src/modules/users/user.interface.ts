import { Document } from "mongoose";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole.ADMIN | UserRole.USER;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
}

export type UpdateUserDto = Pick<IUser, "name">;

export interface IUserService {
    getUser(id: string): Promise<IUser>;
    getUsers(): Promise<IUser[]>;
    createUser(data: CreateUserDto): Promise<IUser>;
    updateUser(id: string, data: UpdateUserDto): Promise<IUser>;
    deleteUser(id: string): Promise<void>;
}
