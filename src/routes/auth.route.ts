import { Router } from "express";
import { AuthRepository } from "../api/repositories/auth.repository";
import AuthController from "../api/controllers/auth.controller";
import { UserService } from "../api/services/user.services";
import { UserRepository } from "../api/repositories/user.repository";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const authRepository = new UserRepository()
const authServices = new UserService(authRepository)
const authController = new AuthController(authServices)

const authMiddleware = new AuthMiddleware(authServices);

export const auth = authMiddleware.handle;

const authRouter = Router()


authRouter.post('/', (req, res) => authController.login(req, res))
authRouter.get('/me', auth, (req, res) => authController.me(req, res))

export default authRouter