import type { Prisma } from "../generated/prisma/client";

declare global{
    namespace Express{
        interface Request {
            user?: Prisma.UserModel
        }
    } 
}