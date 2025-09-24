import { Client } from 'src/Domain/Client/model/client.model';
import { Paged } from 'src/shared/utils/utils';

export interface ClientPersistencePort {
  getOne(input: { id: string }): Promise<Client | null>;
  findAll(input: FindAllClientInput): Promise<Paged<Client[]>>;
  create(input: CreateClientInput): Promise<Client>;
  update(input: UpdateClientInput): Promise<Client>;
  delete(input: { id: string }): Promise<void>;
}
export interface FindAllClientInput {
  pagination: {
    pageNumber: number;
    pageSize: number;
  };
  filters?: {
    search?: string;
    city?: string;
  };
}

export interface CreateClientInput {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  fiscalCode?: string;
  vatNumber?: string;
  mobilePhone?: string;
  telephone?: string;
  email?: string;
}

export interface UpdateClientInput {
  id: string;
  data: {
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    fiscalCode?: string;
    vatNumber?: string;
    mobilePhone?: string;
    telephone?: string;
    email?: string;
  };
}
