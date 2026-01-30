import { Router } from 'express'

import { uploadAvatar } from '../middlewares/upload.middleware'
import { makeAuthMiddleware, makeUserController } from '../../factories/user.factory'

const userRouter = Router()
const userController = makeUserController()
const authMiddleware = makeAuthMiddleware()

userRouter.post('/', (req, res) => userController.create(req, res))
userRouter.get('/', authMiddleware.handle, (req, res) => userController.list(req, res))
userRouter.get('/:id', authMiddleware.handle, (req, res) => userController.find(req, res))
userRouter.put('/:id', authMiddleware.handle, uploadAvatar, (req, res) => userController.update(req, res))
userRouter.delete('/:id', authMiddleware.handle, (req, res) => userController.delete(req, res))

export default userRouter