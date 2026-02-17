import { Injectable } from "@nestjs/common";
import { SupplierGateway } from "src/Persistence/Dal/Supplier/supplier.gateway";

@Injectable()
export class GetCountSupplierUseCase {
    constructor(private readonly supplierGateway: SupplierGateway) { }

    async run(): Promise<number> {
        return await this.supplierGateway.getCount()
    }
}