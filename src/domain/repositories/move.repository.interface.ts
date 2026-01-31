import type { Move } from "../entities/move.entity";

export interface IMoveRepository {
    findById(id: string): Promise<Move | null>
    findAll(): Promise<Move[]>
    findByProductId(productId: string): Promise<Move[]>
    findByUserId(userId: string): Promise<Move[]>
    save(move: Move, tx?: any): Promise<void>
}