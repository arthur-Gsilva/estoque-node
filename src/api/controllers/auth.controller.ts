import type { Request, Response } from "express";
import type { UserService } from "../services/user.services";


export default class AuthController {
    constructor(
        private readonly userService: UserService
    ){}

    async login(req: Request, res: Response){
        const { email, password } = req.body

        const result = await this.userService.login(email, password)

        if(!result){
            res.status(401).json({ error: "Credenciais inválidas" })
        }

        res.json({ error: null, data: result })
    }

    async logout(req: Request, res: Response){
        const authHeader = req.headers.authorization
        if(authHeader){
            const [bearer, token] = authHeader.split(" ")

            if(token){
                await this.userService.logout(token)
            }
        }

        res.json({ error: null, msg: "Logout feito com sucesso." })
    }

    async me(req: Request, res: Response){
        if(!req.user) return null

        const user = await this.userService.getUserByEmail(req.user.email)

        if(!user){
            res.status(404).json({ error: "Usuário não encontrado" })
        }

        res.json({ error: null, data: user })
    }
}