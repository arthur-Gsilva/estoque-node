import { CreateMove } from '../../application/use-cases/move/create-move.use-cases'
import { GetMoveById } from '../../application/use-cases/move/get-move-by-id.use-cases'
import { ListMovesByProduct } from '../../application/use-cases/move/list-moves-by-product.use-cases'
import { ListMovesByUser } from '../../application/use-cases/move/list-moves-by-user.use-cases'
import { ListMoves } from '../../application/use-cases/move/list-moves.use-cases'
import { MoveRepository } from '../database/repositories/move.reposiroy'
import { MoveController } from '../http/controllers/move.controller'

let moveRepository: MoveRepository

const getMoveRepository = () => {
    if (!moveRepository) {
        moveRepository = new MoveRepository()
    }
    return moveRepository
}

export const makeMoveController = () => {
    const repository = getMoveRepository()
    
    return new MoveController(
        new CreateMove(),
        new ListMoves(repository),
        new GetMoveById(repository),
        new ListMovesByProduct(repository),
        new ListMovesByUser(repository)
    )
}