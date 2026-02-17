import { DashboardCountsModel } from "src/Domain/Dashboard/model/dashboard.model";
import { DashboardCountsResponseDTO } from "../dto/response";

export const FromDashboardCountsModelToDashboardCountsResponseDTO = (source: DashboardCountsModel): DashboardCountsResponseDTO => {
    return {
        clients: source.clients, materials: source.materials, suppliers: source.suppliers,
        workOrders: source.workOrders
    }
}