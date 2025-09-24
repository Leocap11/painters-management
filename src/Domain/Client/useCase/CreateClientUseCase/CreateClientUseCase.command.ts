export interface CreateClientUseCaseCommand {
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
