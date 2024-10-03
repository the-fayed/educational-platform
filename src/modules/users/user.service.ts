import {
  CreateUserDto,
  UpdateUserDto,
  IUserService,
  IUser,
} from "./user.interface";
import { UserModel as User } from "./user.model";
import { ApiError } from "../../shared";

export class UserService implements IUserService {
    async getUser(id: string): Promise<IUser> {
        const user = await User.findById(id) as IUser;
        if (!user) {
            throw new ApiError("User not found!", 404);
        }
        return user;
    }
    async getUsers(): Promise<IUser[]> {
        const users = await User.find() as IUser[];
        if (!users) {
            throw new ApiError('No content', 204);
        } 
        return users;
    }
    async createUser(data: CreateUserDto): Promise<IUser> {
        const user = await User.create(data) as IUser;
        if (!user) {
            throw new ApiError('Error while creating user', 400);
        }
        return user;
    }
    async updateUser(id: string, data: UpdateUserDto): Promise<IUser> {
        const user = await User.findByIdAndUpdate(id, data, { new: true }) as IUser;
        if (!user) {
            throw new ApiError('User not found!', 404);
        }
        return user;
    }
    async deleteUser(id: string): Promise<void> {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new ApiError('User not found!', 404);
        }
    }
}
