import type { Prisma } from "../generated/prisma/client";

export const formatUser  = async (user: Prisma.UserModel ) => {
    const { password, ...userWithoutPassword } = user

    if(userWithoutPassword.avatar){
        userWithoutPassword.avatar = `${process.env.base_URL}/static/avatars/${userWithoutPassword.avatar}`
    }

    return userWithoutPassword
}