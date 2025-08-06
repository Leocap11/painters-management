import { Material } from 'src/Domain/Material/model/material.model';

export interface Supplier {
  id: string;
  name: string;
  vatNumber: string;
  address: string;
  city: string;
  email?: string;
  mobilePhone?: string;
  telephone?: string;

  Materials: Omit<Material, 'Supplier'>[];
}
