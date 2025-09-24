import { Client } from 'src/Domain/Client/model/client.model';

export interface ClientPersistencePort {
  getOne(input: { id: string }): Promise<Client>;
  findAll(input: FindAllClientInput): Promise<Client[]>;
  create(input: CreateClientInput): Promise<Client>;
  update(input: UpdateClientInput): Promise<Client>;
  delete(input: { id: string }): Promise<void>;
}
export interface FindAllClientInput {
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
