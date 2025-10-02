import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import { UpdateWorkOrderMaterialUseCase } from 'src/Domain/WorkOrderMaterial/useCase/UpdateWorkOrderMaterialUseCase/UpdateWorkOrderMaterialUseCase';
import { buildSuccessResponse, ResponseDTO } from 'src/shared/utils/utils';
import { WorkOrderMaterialResponseDTO } from './dto/response';
import { FromWorkOrderMaterialModelToWorkOrderMaterialResponseDTO } from './mapper/mapper';
import { UpdateWorkOrderMaterialRequestDTO } from './dto/request';
import { DeleteWorkOrderMaterialUseCase } from 'src/Domain/WorkOrderMaterial/useCase/DeleteWorkOrderMaterialUseCase/DeleteWorkOrderMaterialUseCase';

@Controller('work-order-materials')
export class WorkOrderMaterialController {
  constructor(
    private readonly updateWorkOrderMaterialUseCase: UpdateWorkOrderMaterialUseCase,
    private readonly deleteWorkOrderMaterialUseCase: DeleteWorkOrderMaterialUseCase
  ) {}

  @Patch(':id')
  async updateWorkOrderMaterial(
    @Param('id') id: string,
    @Body()
    body: UpdateWorkOrderMaterialRequestDTO
  ): Promise<ResponseDTO<WorkOrderMaterialResponseDTO>> {
    const material = await this.updateWorkOrderMaterialUseCase.run({
      id: id,
      data: body
    });

    return buildSuccessResponse(
      FromWorkOrderMaterialModelToWorkOrderMaterialResponseDTO(material)
    );
  }
  @Delete(':id')
  async deleteWorkOrderMaterial(@Param('id') id: string): Promise<void> {
    await this.deleteWorkOrderMaterialUseCase.run({ id: id });
  }
}
