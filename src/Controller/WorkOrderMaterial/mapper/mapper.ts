import { WorkOrderMaterial } from 'src/Domain/WorkOrderMaterial/model/workOrderMaterial.model';
import { FromMaterialModelToMaterialResponseDTO } from 'src/Controller/Material/mapper/mapper';
import { WorkOrderMaterialResponseDTO } from '../dto/response';

export const FromWorkOrderMaterialModelToWorkOrderMaterialResponseDTO = (
  source: WorkOrderMaterial
): WorkOrderMaterialResponseDTO => {
  return {
    id: source.id,
    workOrderId: source.workOrderId,
    squareMeters: source.squareMeters,
    unitPrice: source.unitPrice,
    Material: FromMaterialModelToMaterialResponseDTO(source.Material)
  };
};
