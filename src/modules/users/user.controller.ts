import asyncHandler from "express-async-handler";

import { UserService } from "./user.service";
import { ApiError } from "../../shared";
import { CreateUserDto, UpdateUserDto } from "./user.interface";

export class UserController {
   private userService: UserService;

   constructor() {
      this.userService = new UserService();
   }

   getUser = asyncHandler(async (req, res, next) => {
      const user = await this.userService.getUser(req.params.id);
      if (!user) {
         next(new ApiError("User not found!", 404));
      }
      res.status(200).json({
         status: "success",
         data: user,
      });
   });

   getUsers = asyncHandler(async (req, res, next) => {
      const users = await this.userService.getUsers();
      if (!users) {
         next(new ApiError("No content", 204));
      }
      res.status(200).json({
         status: "success",
         data: users,
      });
   });

   createUser = asyncHandler(async (req, res, next) => {
      const dto: CreateUserDto = {
         name: req.body.name,
         email: req.body.email,
         password: req.body.password
      };

      const user = await this.userService.createUser(dto);
      if (!user) {
         next(new ApiError("Error while creating user", 400));
      }

      res.status(201).json({
         status: "success",
         data: user,
      });
   });

   updateUser = asyncHandler(async(req, res, next) => {
      const dto: UpdateUserDto = {
         name: req.body.name,
      };

      const user = await this.userService.updateUser(req.params.id, dto);
      if (!user) {
         next(new ApiError("Error while updating user", 400));
      }

      res.status(200).json({
         status: "success",
         data: user,
      });
   });

   deleteUser = asyncHandler(async(req, res, next) => {
      await this.userService.deleteUser(req.params.id);
      res.sendStatus(204);
   });
}