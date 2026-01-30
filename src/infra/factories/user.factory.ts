import { UserRepository } from '../database/repositories/user.repository'
import { BcryptPasswordHasher } from '../../application/services/password-hasher.service'
import { CryptoTokenGenerator } from '../../application/services/token-generator.service'
import { LocalFileStorage } from '../../application/services/file-storage.service'



import { UserController } from '../http/controllers/user.controller'

import { AuthMiddleware } from '../http/middlewares/auth.middleware'
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-cases'
import { LoginUserUseCase } from '../../application/use-cases/auth/login-user.use-cases'
import { LogoutUserUseCase } from '../../application/use-cases/auth/logout-user.use-cases'
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user.use-cases'
import { GetUserByIdUseCase } from '../../application/use-cases/user/get-user-by-id.use-cases'
import { ListUsersUseCase } from '../../application/use-cases/user/list-users.use-cases'
import { DeleteUserUseCase } from '../../application/use-cases/user/delete-user.use-cases'
import { AuthController } from '../http/controllers/auth.controller'

let userRepository: UserRepository
let passwordHasher: BcryptPasswordHasher
let tokenGenerator: CryptoTokenGenerator
let fileStorage: LocalFileStorage

const getUserRepository = () => {
    if (!userRepository) {
        userRepository = new UserRepository()
    }
    return userRepository
}

const getPasswordHasher = () => {
    if (!passwordHasher) {
        passwordHasher = new BcryptPasswordHasher()
    }
    return passwordHasher
}

const getTokenGenerator = () => {
    if (!tokenGenerator) {
        tokenGenerator = new CryptoTokenGenerator()
    }
    return tokenGenerator
}

const getFileStorage = () => {
    if (!fileStorage) {
        fileStorage = new LocalFileStorage()
    }
    return fileStorage
}

export const makeCreateUserUseCase = () => {
    return new CreateUserUseCase(
        getUserRepository(),
        getPasswordHasher()
    )
}

export const makeLoginUserUseCase = () => {
    return new LoginUserUseCase(
        getUserRepository(),
        getPasswordHasher(),
        getTokenGenerator()
    )
}

export const makeLogoutUserUseCase = () => {
    return new LogoutUserUseCase(getUserRepository())
}

export const makeUpdateUserUseCase = () => {
    return new UpdateUserUseCase(
        getUserRepository(),
        getPasswordHasher(),
        getFileStorage()
    )
}

export const makeGetUserByIdUseCase = () => {
    return new GetUserByIdUseCase(getUserRepository())
}

export const makeListUsersUseCase = () => {
    return new ListUsersUseCase(getUserRepository())
}

export const makeDeleteUserUseCase = () => {
    return new DeleteUserUseCase(getUserRepository())
}

export const makeUserController = () => {
    return new UserController(
        makeCreateUserUseCase(),
        makeListUsersUseCase(),
        makeGetUserByIdUseCase(),
        makeUpdateUserUseCase(),
        makeDeleteUserUseCase()
    )
}

export const makeAuthController = () => {
    return new AuthController(
        makeLoginUserUseCase(),
        makeLogoutUserUseCase(),
        makeGetUserByIdUseCase()
    )
}

export const makeAuthMiddleware = () => {
    return new AuthMiddleware(getUserRepository())
}