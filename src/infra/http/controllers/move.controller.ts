import type { Request, Response } from "express";
import type { CreateMove } from "../../../application/use-cases/move/create-move.use-cases";
import type { ListMoves } from "../../../application/use-cases/move/list-moves.use-cases";
import type { GetMoveById } from "../../../application/use-cases/move/get-move-by-id.use-cases";
import type { ListMovesByProduct } from "../../../application/use-cases/move/list-moves-by-product.use-cases";
import type { ListMovesByUser } from "../../../application/use-cases/move/list-moves-by-user.use-cases";

export class MoveController {
    constructor(
        private readonly createMove: CreateMove,
        private listMoves: ListMoves,
        private getMoveById: GetMoveById,
        private listMovesByProduct: ListMovesByProduct,
        private listMovesByUser: ListMovesByUser
    ){}

    async create(req: Request, res: Response){
        try{
            if(!req.user) return res.status(401).json({ error: "Não autorizado" })

            const { productId, type, quantity } = req.body

            if(type !== "in" && type !== 'out'){
                res.status(400).json({ error: "Tipo de transaçao inválida" })
            }

            if(quantity <= 0){
                res.status(400).json({ error: "Insira uma quantidade válida" })
            }

            const move = await this.createMove.execute({
                productId,
                quantity,
                type,
                userId: req.user.id
            })

            return res.status(201).json({ error: null, data: move })
        } catch(error: any){
            return res.status(400).json({ 
                error: error.message 
            })
        }
        
    }

    list = async (req: Request, res: Response) => {
        try {
            const moves = await this.listMoves.execute()

            return res.json({ 
                error: null, 
                data: moves 
            })
        } catch (error: any) {
            return res.status(400).json({ 
                error: error.message 
            })
        }
    }

    find = async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const move = await this.getMoveById.execute(id as string)

            return res.json({ 
                error: null, 
                data: move 
            })
        } catch (error: any) {
            return res.status(404).json({ 
                error: error.message 
            })
        }
    }

    listByProduct = async (req: Request, res: Response) => {
        try {
            const { productId } = req.params

            const moves = await this.listMovesByProduct.execute(productId as string)

            return res.json({ 
                error: null, 
                data: moves 
            })
        } catch (error: any) {
            return res.status(400).json({ 
                error: error.message 
            })
        }
    }

    listByUser = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params

            const moves = await this.listMovesByUser.execute(userId as string)

            return res.json({ 
                error: null, 
                data: moves 
            })
        } catch (error: any) {
            return res.status(400).json({ 
                error: error.message 
            })
        }
    }
}