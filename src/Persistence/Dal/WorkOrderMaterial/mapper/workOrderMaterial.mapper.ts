import { WorkOrderMaterial } from 'src/Domain/WorkOrderMaterial/model/workOrderMaterial.model';
import { WorkOrderMaterialEntity } from '../entity/workOrderMaterial.entity';
import { FromMaterialEntityToMaterialModel } from '../../Material/mapper/material.mapper';

export const FromWorkOrderMaterialEntityToWorkOrderMaterialModel = (
  source: WorkOrderMaterialEntity
): WorkOrderMaterial => {
  return {
    id: source.id,
    workOrderId: source.workOrder_id,
    unitPrice: source.unitPrice,
    squareMeters: source.square_meters,
    Material: FromMaterialEntityToMaterialModel(source.Material)
  };
};
