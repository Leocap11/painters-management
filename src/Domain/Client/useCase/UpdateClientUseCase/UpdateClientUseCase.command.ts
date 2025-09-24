export interface UpdateClientUseCaseCommand {
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
