import { Injectable } from "@nestjs/common";
import { WorkOrderGateway } from "src/Persistence/Dal/WorkOrder/workOrder.gateway";

@Injectable()
export class GetCountWorkOrderUseCase {
    constructor(private readonly workOrderGateway: WorkOrderGateway) { }

    async run(): Promise<number> {
        return await this.workOrderGateway.getCount()
    }
}