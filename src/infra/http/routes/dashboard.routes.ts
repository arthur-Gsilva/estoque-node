import { Router } from "express";
import { makeDashboardController } from "../../factories/dashboard.factory";
import { makeAuthMiddleware } from "../../factories/user.factory";

const dashboardRouter = Router()
const dashboardController = makeDashboardController()
const authMiddleware = makeAuthMiddleware()

dashboardRouter.get('/inventory-value', authMiddleware.handle, (req, res) => dashboardController.getInventoryValue(req, res))
dashboardRouter.get('/low-stock', authMiddleware.handle, (req, res) => dashboardController.lowStock(req, res))

export default dashboardRouter

