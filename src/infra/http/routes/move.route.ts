import { Router } from 'express'
import { makeMoveController } from '../../factories/move.factory'
import { makeAuthMiddleware } from '../../factories/user.factory'

const moveRouter = Router()
const moveController = makeMoveController()
const authMiddleware = makeAuthMiddleware()


moveRouter.post('/', authMiddleware.handle, (req, res) => moveController.create(req, res))

moveRouter.get('/', authMiddleware.handle, (req, res) => moveController.list(req, res))

moveRouter.get('/:id', authMiddleware.handle, (req, res) => moveController.find(req, res))

moveRouter.get('/product/:productId', authMiddleware.handle, (req, res) => moveController.listByProduct(req, res))

moveRouter.get('/user/:userId', authMiddleware.handle, (req, res) => moveController.listByUser(req, res))

export default moveRouter