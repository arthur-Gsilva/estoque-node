import type { IDashboardRepository } from "../../../domain/repositories/dashboards.repository.interface";

export class CalculateInventory {
    constructor(
        private readonly dashboardRepository: IDashboardRepository
    ){}

    async execute(){
        return await this.dashboardRepository.getInventoryValue()
    }
}