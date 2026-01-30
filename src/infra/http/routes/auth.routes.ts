import { Router } from 'express'
import { makeAuthController, makeAuthMiddleware } from '../../factories/user.factory'

const authRouter = Router()
const authController = makeAuthController()
const authMiddleware = makeAuthMiddleware()

authRouter.post('/', (req, res) => authController.login(req, res))
authRouter.post('/logout', authMiddleware.handle, (req, res) => authController.logout(req, res))
authRouter.get('/me', authMiddleware.handle, (req, res) => authController.me(req, res))

export default authRouter