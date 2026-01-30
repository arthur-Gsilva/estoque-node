import type { Request, Response } from 'express'
import type { LoginUserUseCase } from '../../../application/use-cases/auth/login-user.use-cases'
import type { LogoutUserUseCase } from '../../../application/use-cases/auth/logout-user.use-cases'
import type { GetUserByIdUseCase } from '../../../application/use-cases/user/get-user-by-id.use-cases'


export class AuthController {
    constructor(
        private loginUserUseCase: LoginUserUseCase,
        private logoutUserUseCase: LogoutUserUseCase,
        private getUserByIdUseCase: GetUserByIdUseCase
    ) {}

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            const result = await this.loginUserUseCase.execute({
                email,
                password
            })

            return res.json({ 
                error: null, 
                data: result 
            })
        } catch (error: any) {
            return res.status(401).json({ 
                error: error.message 
            })
        }
    }

    logout = async (req: Request, res: Response) => {
        try {
            const authHeader = req.headers.authorization
            
            if (authHeader) {
                const [, token] = authHeader.split(' ')
                
                if (token) {
                    await this.logoutUserUseCase.execute(token)
                }
            }

            return res.json({ 
                error: null, 
                msg: "Logout feito com sucesso" 
            })

        } catch (error: any) {
            return res.status(401).json({ 
                error: error.message 
            })
        }
    }

    me = async (req: Request, res: Response) => {
        try{
            if(!req.user) return null

            const user = await this.getUserByIdUseCase.execute(req.user.id)

            if(!user){
                res.status(404).json({ error: "Usuário não encontrado" })
            }

            res.json({error: null, data: user})
        } catch(error: any){
            return res.status(400).json({ 
                error: error.message 
            })
        }
    }

}