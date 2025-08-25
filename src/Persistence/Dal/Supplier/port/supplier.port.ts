import { Supplier } from 'src/Domain/Supplier/model/supplier.model';

export interface SupplierPersistenceGateway {
  getOne(input: { id: string }): Promise<Supplier>;
  findAll(input: FindAllSupplierInput): Promise<Supplier[]>;
  create(input: CreateSupplierInput): Promise<Supplier>;
  update(input: UpdateSupplierInput): Promise<Supplier>;
  delete(input: { id: string }): Promise<void>;
}

export interface CreateSupplierInput {
  name: string;
  vatNumber: string;
  address: string;
  city: string;
  email?: string;
  mobilePhone?: string;
  telephone?: string;
}

export interface UpdateSupplierInput {
  id: string;
  data?: {
    name?: string;
    vatNumber?: string;
    address?: string;
    city?: string;
    email?: string;
    mobilePhone?: string;
    telephone?: string;
  };
}

export interface FindAllSupplierInput {
  filters?: {
    search?: string;
    name?: string;
    city?: string;
  };
}
