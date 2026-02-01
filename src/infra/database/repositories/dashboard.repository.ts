import type { Product } from "../../../domain/entities/product.entity";
import type { IDashboardRepository } from "../../../domain/repositories/dashboards.repository.interface";
import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../../libs/prisma";

export class DashboardRepository implements IDashboardRepository {
    async getInventoryValue(): Promise<number | null> {
        const result = await prisma.$queryRaw<
            { totalValue: number }[]
        >(Prisma.sql`
            SELECT COALESCE(SUM(stock * unit_price), 0)::float8 AS "totalValue"
            FROM products
            WHERE "deletedAt" IS NULL
        `)

        return result[0]?.totalValue ?? 0
    }

   async getLowStockProducts(): Promise<Product> {
       return await prisma.$queryRaw`
        SELECT *
        FROM products
        WHERE "deletedAt" IS NULL
            AND stock <= min_stock * 1.1
        `
   }
}