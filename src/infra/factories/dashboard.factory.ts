import { CalculateInventory } from '../../application/use-cases/dashboards/calculate-inventory.use-cases'
import { ListLowStockProducts } from '../../application/use-cases/dashboards/list-low-stock-products.use-cases'
import { CreateMove } from '../../application/use-cases/move/create-move.use-cases'
import { GetMoveById } from '../../application/use-cases/move/get-move-by-id.use-cases'
import { ListMovesByProduct } from '../../application/use-cases/move/list-moves-by-product.use-cases'
import { ListMovesByUser } from '../../application/use-cases/move/list-moves-by-user.use-cases'
import { ListMoves } from '../../application/use-cases/move/list-moves.use-cases'
import { DashboardRepository } from '../database/repositories/dashboard.repository'
import { MoveRepository } from '../database/repositories/move.reposiroy'
import { DashboardController } from '../http/controllers/dashboard.controller'
import { MoveController } from '../http/controllers/move.controller'

let dashboardRepository: DashboardRepository

const getMoveRepository = () => {
    if (!dashboardRepository) {
        dashboardRepository = new DashboardRepository()
    }
    return dashboardRepository
}

export const makeDashboardController = () => {
    const repository = getMoveRepository()
    
    return new DashboardController(
        new CalculateInventory(repository),
        new ListLowStockProducts(repository)
    )
}