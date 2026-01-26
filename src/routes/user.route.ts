import { Router } from "express";
import UserController from "../api/controllers/user.controller";
import { UserService } from "../api/services/user.services";
import { UserRepository } from "../api/repositories/user.repository";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { uploadAvatar } from "../middlewares/upload.middleware";

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

const authMiddleware = new AuthMiddleware(userService);

export const auth = authMiddleware.handle;

const userRouter = Router()


userRouter.get('/', auth, (req, res) => userController.list(req, res))
userRouter.get('/:id', auth, (req, res) => userController.find(req, res))
userRouter.post('/', (req, res) => userController.create(req, res))

userRouter.delete('/:id', auth, (req, res) => userController.delete(req, res))
userRouter.put('/:id', auth, uploadAvatar, (req, res) => userController.update(req, res))

export default userRouter