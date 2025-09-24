export interface UpdateSupplierUseCaseCommand {
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
