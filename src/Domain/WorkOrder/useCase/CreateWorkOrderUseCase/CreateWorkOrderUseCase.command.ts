import { Temporal } from "@js-temporal/polyfill";

export interface CreateWorkOrderUseCaseCommand {
  clientId: string;
  startWorkOrderDate: Temporal.PlainDate;
  endWorkOrderDate: Temporal.PlainDate;
  workOrderMaterials: {
    materialId: string;
    squareMeters: number;
    unitPrice: number;
  }[];
}
