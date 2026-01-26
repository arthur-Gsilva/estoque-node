import type { Request, Response } from "express";
import type { UserService } from "../services/user.services";
import { saveAvatar } from "../services/file.service";

export default class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    public async create(req: Request, res: Response) {
        const { name, email, password } = req.body

        const user = await this.userService.createUser(name, email, password)

        res.status(201).json({ error: null, data: user })
    }


    public async list(req: Request, res: Response) {
        const {offset, limit} = req.query
        const users = 
            await this.userService.getAllUsers(parseInt(offset as string), parseInt(limit as string))

        return res.status(200).json({ error: null, data: users })
    }

    public async find(req: Request, res: Response) {
        const { id } = req.params
        const user = await this.userService.getUserById(id as string)
        if(!user){
            res.status(404).json({ error: "Usuário não encontrado" })
        }

        res.json({ error: null, data: user })

    }

    public async update(req: Request, res: Response) {
        const { id } = req.params
        const  data  = req.body

        if (!id) {
            return res.status(400).json({ error: 'ID é obrigatório' })
        }

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ error: 'Dados para atualização são obrigatórios' })
        }

        let avatarFilename: string | undefined
        if(req.file){
            avatarFilename = await saveAvatar(req.file?.buffer, req.file?.originalname)
        }
        const updateData = {...data}
        if(avatarFilename){
            updateData.avatar = avatarFilename
        }


        const updatedUser = await this.userService.updateUser(id as string, updateData)
        if(!updatedUser){
            return res.status(400).json({ error: "Error ao encontrar usuário" })
        }

        res.json({ error: null, data: updatedUser })
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ error: 'ID é obrigatório' })
        }

        const user = await this.userService.deleteUser(id as string)
        if(!user){
            res.status(404).json({ error: "Usuário não encontrado" })
        }

        res.json({ error: null, msg: "Usuário deletado com sucesso" })
    }
}