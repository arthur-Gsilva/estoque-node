// src/infra/database/transaction/prisma-transaction.ts

import { prisma } from '../../../libs/prisma'
import type { ITransaction } from '../../../domain/repositories/transaction.interface'

export class PrismaTransaction implements ITransaction {
    async execute<T>(callback: () => Promise<T>): Promise<T> {
        return await prisma.$transaction(async (tx) => {
            return await callback()
        })
    }
}