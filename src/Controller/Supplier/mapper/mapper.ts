import { Supplier } from 'src/Domain/Supplier/model/supplier.model';
import { SupplierResponseDTO } from '../dto/response';

export const FromSupplierModelToSupplierResponseDTO = (
  source: Supplier
): SupplierResponseDTO => {
  return {
    id: source.id,
    address: source.address,
    city: source.city,
    name: source.name,
    vatNumber: source.vatNumber,
    email: source.email,
    mobilePhone: source.mobilePhone,
    telephone: source.telephone
  };
};
