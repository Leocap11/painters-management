import { MaterialResponseDTO } from 'src/Controller/Material/dto/response';

export interface WorkOrderMaterialResponseDTO {
  id: string;
  workOrderId: string;
  squareMeters: number;
  unitPrice: number;
  Material: MaterialResponseDTO;
}
