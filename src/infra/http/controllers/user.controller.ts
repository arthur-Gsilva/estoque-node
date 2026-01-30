import type { Request, Response } from 'express'
import type { CreateUserUseCase } from '../../../application/use-cases/user/create-user.use-cases'
import type { UpdateUserUseCase } from '../../../application/use-cases/user/update-user.use-cases'
import type { ListUsersUseCase } from '../../../application/use-cases/user/list-users.use-cases'
import type { GetUserByIdUseCase } from '../../../application/use-cases/user/get-user-by-id.use-cases'
import type { DeleteUserUseCase } from '../../../application/use-cases/user/delete-user.use-cases'

export class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private listUsersUseCase: ListUsersUseCase,
        private getUserByIdUseCase: GetUserByIdUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private deleteUserUseCase: DeleteUserUseCase
    ) {}

    create = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body

            const user = await this.createUserUseCase.execute({
                name,
                email,
                password
            })

            return res.status(201).json({ 
                error: null, 
                data: user 
            })
        } catch (error: any) {
            return res.status(400).json({ 
                error: error.message 
            })
        }
    }

    list = async (req: Request, res: Response) => {
        try {
            const { offset, limit } = req.query

            const result = await this.listUsersUseCase.execute(
                parseInt(offset as string) || 0,
                parseInt(limit as string) || 10
            )

            return res.status(200).json({ 
                error: null, 
                data: result.users 
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

            const user = await this.getUserByIdUseCase.execute(id as string)

            return res.json({ 
                error: null, 
                data: user 
            })
        } catch (error: any) {
            return res.status(404).json({ 
                error: error.message 
            })
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const data = req.body

            const user = await this.updateUserUseCase.execute({
                userId: id,
                ...data,
                file: req.file ? {
                    buffer: req.file.buffer,
                    originalname: req.file.originalname
                } : undefined
            })

            return res.json({ 
                error: null, 
                data: user 
            })
        } catch (error: any) {
            return res.status(400).json({ 
                error: error.message 
            })
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            await this.deleteUserUseCase.execute(id as string)

            return res.json({ 
                error: null, 
                message: 'Usuário deletado com sucesso' 
            })
        } catch (error: any) {
            return res.status(404).json({ 
                error: error.message 
            })
        }
    }
}