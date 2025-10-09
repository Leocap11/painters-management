export interface ClientResponseDTO {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;

  //optional fields
  fiscalCode: string | null;
  vatNumber: string | null;
  mobilePhone: string | null;
  telephone: string | null;
  email: string | null;
}
