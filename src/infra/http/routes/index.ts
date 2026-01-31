import { Router } from 'express'
import userRouter from './user.routes'
import authRouter from './auth.routes'
import categoryRouter from './category.routes'
import productRouter from './product.route'
import moveRouter from './move.route'

const router = Router()

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use("/category", categoryRouter)
router.use("/products", productRouter)
router.use("/move", moveRouter)

export default router