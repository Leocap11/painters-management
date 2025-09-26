export interface ClientResponseDTO {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;

  //optional fields
  fiscalCode?: string;
  vatNumber?: string;
  mobilePhone?: string;
  telephone?: string;
  email?: string;
}
