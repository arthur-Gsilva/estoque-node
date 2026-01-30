// src/infrastructure/http/middlewares/auth.middleware.ts

import type { Request, Response, NextFunction } from 'express'
import { type IUserRepository } from '../../../domain/repositories/user.repository.interface'

export class AuthMiddleware {
    constructor(private userRepository: IUserRepository) {}

    handle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization

            if (!authHeader) {
                return res.status(401).json({ 
                    error: 'Token não fornecido' 
                })
            }

            const [type, token] = authHeader.split(' ')

            if (type !== 'Bearer' || !token) {
                return res.status(401).json({ 
                    error: 'Token inválido' 
                })
            }

            const user = await this.userRepository.findByToken(token)

            if (!user) {
                return res.status(401).json({ 
                    error: 'Token inválido ou expirado' 
                })
            }

            // Adicionar dados do usuário na request
            //@ts-ignore
            req.user = {
                id: user.id,
                email: user.email.getValue(),
                admin: user.admin,
                name: user.name,
            }

            return next()
        } catch (error) {
            return res.status(401).json({ 
                error: 'Não autorizado' 
            })
        }
    }
}