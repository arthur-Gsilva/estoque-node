import type { UserRepository } from "../repositories/user.repository";
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import type { Prisma } from "../../generated/prisma/client";
import { formatUser } from "../../utils/formatUser";
import { v4 as uuidv4 } from 'uuid'
import type { UpdateUserType } from "../../types/user";
import { deleteAvatar } from "./file.service";

export class UserService{
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async getAllUsers(offset: number = 0, limit: number = 10){
        const userList =  await this.userRepository.getAllUser(offset, limit)

        return userList.map(formatUser)
    }

    async createUser(name: string, email: string, password: string){
        const user = await this.userRepository.findByEmail(email)
        if(user) throw new Error("Usuário já cadastrado")

        const hashedPassowrd = await this.hashPassword(password)

        const id = uuidv4()

        const data = {id, name, email, password}

        const newUser = {
            ...data,
            password: hashedPassowrd
        }

        const result = await this.userRepository.create(newUser)
        const userUnique = result[0]

        if(!userUnique) throw new Error("Erro ao cadastrar usuário")
        

        return formatUser(userUnique)
    }

    async getUserByEmail(email: string){
        return await this.userRepository.findByEmail(email)
    }
    async getUserById(id: string){
        return await this.userRepository.findById(id)
    }

    async hashPassword(password: string){
        return bcrypt.hash(password, 10)
    }

    async login(email: string, password: string){
        const user = await this.userRepository.findByEmail(email)
        if(!user) return null
        
        const isValidPassword = await this.verifyPassword(password, user.password)
        if(!isValidPassword) return null

        const token = crypto.randomBytes(32).toString('hex')

        return this.userRepository.loginUser(token, user.id)
    }

    async verifyPassword(password: string, hash: string){
        return bcrypt.compare(password, hash)
    }

    async logout(token: string){
        return await this.userRepository.logoutUser(token)
    }

    async authenticate(token: string){
        return await this.userRepository.authenticateUser(token)
    }
    async deleteUser(id: string){
        return await this.userRepository.delete(id)
    }

    async updateUser(id: string, data: UpdateUserType){
        const user = await this.userRepository.findById(id)
        if(!user) throw new Error("usuário não encontrado")
        

        if(data.email && data.email !== user.email){
            const emailIsUsed = await this.userRepository.findByEmail(data.email)
            if(emailIsUsed) throw new Error("Email inválido")
        }

        const updateData = {...data}

        if(data.password){
            updateData.password = await this.hashPassword(data.password)
        }

        if(data.avatar && user.avatar && data.avatar === user.avatar){
            await deleteAvatar(user.avatar)
        }

        updateData.uptadesAt = new Date()

        const result = await this.userRepository.update(id, updateData)
        const updatedUser = result[0]

        if(!updatedUser) return null

        return formatUser(updatedUser)
    }
}