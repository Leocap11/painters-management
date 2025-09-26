import { Supplier } from 'src/Domain/Supplier/model/supplier.model';
import { SupplierEntity } from '../entity/supplier.entity';

export const FromSupplierEntityToSupplierModel = (
  source: SupplierEntity
): Supplier => {
  return {
    id: source.id,
    name: source.name,
    vatNumber: source.vat_number,
    address: source.address,
    city: source.city,
    email: source.email,
    mobilePhone: source.mobile_phone,
    telephone: source.telephone
  };
};
