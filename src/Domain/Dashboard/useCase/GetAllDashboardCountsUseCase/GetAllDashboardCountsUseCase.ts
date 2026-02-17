import { Injectable } from "@nestjs/common";
import { GetCountClientUseCase } from "src/Domain/Client/useCase/GetCountClientUseCase/GetCountClientUseCase";
import { GetCountMaterialUseCase } from "src/Domain/Material/useCase/GetCountMaterialUseCase/GetCountMaterialUseCase";
import { GetCountSupplierUseCase } from "src/Domain/Supplier/useCase/GetCountSupplierUseCase/GetCountSupplierUseCase";
import { GetCountWorkOrderUseCase } from "src/Domain/WorkOrder/useCase/GetCountWorkOrderUseCase/GetCountWorkOrderUseCase";
import { DashboardCountsModel } from "../../model/dashboard.model";

@Injectable()
export class GetAllDashboardCountsUseCase {
    constructor(private readonly getCountSupplierUseCase: GetCountSupplierUseCase,
        private readonly getCountWorkOrderUseCase: GetCountWorkOrderUseCase,
        private readonly getCountMaterialUseCase: GetCountMaterialUseCase,
        private readonly getCountClientUseCase: GetCountClientUseCase) { }


    async run(): Promise<DashboardCountsModel> {
        return { clients: await this.getCountClientUseCase.run(), materials: await this.getCountMaterialUseCase.run(), suppliers: await this.getCountSupplierUseCase.run(), workOrders: await this.getCountWorkOrderUseCase.run() }
    }
}