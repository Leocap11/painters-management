import { Material } from 'src/Domain/Material/model/material.model';
import { MaterialResponseDTO } from '../dto/response';

export const FromMaterialModelToMaterialResponseDTO = (
  source: Material
): MaterialResponseDTO => {
  return {
    id: source.id,
    costPerSquareMeter: source.costPerSquareMeter,
    instructionsForUse: source.instructionsForUse,
    name: source.name,
    productCode: source.productCode,
    vatPercentage: source.vatPercentage,
    supplierId: source.supplierId
  };
};
