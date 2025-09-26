import { Client } from 'src/Domain/Client/model/client.model';
import { ClientResponseDTO } from '../dto/response';

export const FromClientModelToClientResponseDTO = (
  source: Client
): ClientResponseDTO => {
  return {
    id: source.id,
    firstName: source.firstName,
    lastName: source.lastName,
    address: source.address,
    city: source.city,
    email: source.email,
    fiscalCode: source.fiscalCode,
    mobilePhone: source.mobilePhone,
    telephone: source.telephone,
    vatNumber: source.vatNumber
  };
};
