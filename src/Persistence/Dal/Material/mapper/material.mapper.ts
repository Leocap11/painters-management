import { MaterialEntity } from 'src/Persistence/Dal/Material/entity/material.entity';
import { Material } from '../../../../Domain/Material/model/material.model';
import { FromSupplierEntityToSupplierModel } from '../../Supplier/mapper/supplier.mapper';

export const FromMaterialEntityToMaterialModel = (
  source: MaterialEntity
): Material => {
  return {
    id: source.id,
    productCode: source.product_code,
    name: source.name,
    costPerSquareMeter: source.cost_per_square_meter,
    note: source.note,
    vatPercentage: source.vat_percentage,
    Supplier: FromSupplierEntityToSupplierModel(source.Supplier)
  };
};
