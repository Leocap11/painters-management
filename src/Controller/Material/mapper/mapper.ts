import { FromSupplierModelToSupplierResponseDTO } from './../../Supplier/mapper/mapper';
import { Material } from 'src/Domain/Material/model/material.model';
import { MaterialResponseDTO } from '../dto/response';

export const FromMaterialModelToMaterialResponseDTO = (
  source: Material
): MaterialResponseDTO => {
  return {
    id: source.id,
    costPerSquareMeter: source.costPerSquareMeter,
    note: source.note,
    name: source.name,
    productCode: source.productCode,
    vatPercentage: source.vatPercentage,
    Supplier: FromSupplierModelToSupplierResponseDTO(source.Supplier)
  };
};
