import { Injectable } from "@nestjs/common";
import { MaterialGateway } from "src/Persistence/Dal/Material/material.gateway";

@Injectable()
export class GetCountMaterialUseCase {
    constructor(private readonly materialGateway: MaterialGateway) { }

    async run(): Promise<number> {
        return await this.materialGateway.getCount()
    }
}