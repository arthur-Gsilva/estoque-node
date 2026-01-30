import { Router } from "express";
import { makeCategoryController } from "../../factories/category.factory";
import { makeAuthMiddleware } from "../../factories/user.factory";

const categoryRouter = Router()
const categoryController = makeCategoryController()
const authMiddleware = makeAuthMiddleware()

categoryRouter.post('/', authMiddleware.handle, (req, res) => categoryController.create(req, res))
categoryRouter.get('/',  (req, res) => categoryController.list(req, res))
categoryRouter.get('/:id',  (req, res) => categoryController.find(req, res))
categoryRouter.put('/:id', authMiddleware.handle, (req, res) => categoryController.update(req, res))
categoryRouter.delete('/:id', authMiddleware.handle, (req, res) => categoryController.delete(req, res))

export default categoryRouter