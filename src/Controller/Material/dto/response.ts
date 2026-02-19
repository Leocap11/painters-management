import { SupplierResponseDTO } from 'src/Controller/Supplier/dto/response';

export interface MaterialResponseDTO {
  id: string;
  productCode: string | null;
  name: string;
  costPerSquareMeter: number;
  note: string | null;
  vatPercentage: number;

  Supplier: SupplierResponseDTO;
}
