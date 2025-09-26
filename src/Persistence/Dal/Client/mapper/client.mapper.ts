import { Client } from 'src/Domain/Client/model/client.model';
import { ClientEntity } from '../entity/client.entity';

export const FromClientEntityToClientModel = (source: ClientEntity): Client => {
  return {
    id: source.id,
    firstName: source.first_name,
    lastName: source.last_name,
    address: source.address,
    city: source.city,
    fiscalCode: source.fiscal_code,
    vatNumber: source.vat_number,
    mobilePhone: source.mobile_phone,
    telephone: source.telephone,
    email: source.email
  };
};
