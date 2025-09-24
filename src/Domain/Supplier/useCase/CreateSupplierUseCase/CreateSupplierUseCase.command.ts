export interface CreateSupplierUseCaseCommand {
  name: string;
  vatNumber: string;
  address: string;
  city: string;
  email?: string;
  mobilePhone?: string;
  telephone?: string;
}
