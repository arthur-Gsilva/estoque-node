import { Router } from "express";
import { makeAuthMiddleware } from "../../factories/user.factory";
import { makeProductController } from "../../factories/product.factory";

const productRouter = Router()
const productController = makeProductController()
const authMiddleware = makeAuthMiddleware()

productRouter.post('/',  (req, res) => productController.create(req, res))
productRouter.get('/',  (req, res) => productController.list(req, res))
productRouter.get('/:id',  (req, res) => productController.find(req, res))
// productRouter.put('/:id', authMiddleware.handle, (req, res) => productController.update(req, res))
// productRouter.delete('/:id', authMiddleware.handle, (req, res) => productController.delete(req, res))

export default productRouter