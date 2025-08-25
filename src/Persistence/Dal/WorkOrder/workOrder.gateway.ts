import { Injectable } from '@nestjs/common';
import { PrismaPaintersEntities } from 'src/Persistence/Clients/Prisma/PrismaPaintersManagementTypes';
import {
  CreateWorkOrderInput,
  FindAllWorkOrderInput,
  UpdateStatusWorkOrderInput,
  UpdateWorkOrderInput,
  WorkOrderPersistencePort
} from './port/workOrder.port';
import { WorkOrder } from 'src/Domain/WorkOrder/model/workOrder.model';
import { WorkOrderStatus } from '@prisma/client';
import {
  FormWorkOrderStatusToWorkOrderStatusPrisma,
  FromWorkOrderEntityToWorkOrderModel
} from './mapper/workOrder.mapper';

@Injectable()
export class WorkOrderGateway implements WorkOrderPersistencePort {
  constructor(private readonly prisma: PrismaPaintersEntities.PrismaClient) {}

  private include: {
    Client: true;
    WorkOrderMaterials: {
      include: {
        Material: true;
      };
    };
  };

  async create(input: CreateWorkOrderInput): Promise<WorkOrder> {
    const workOrder = await this.prisma.workOrder.create({
      include: this.include,
      data: {
        start_work_date: input.startWorkOrderDate,
        end_work_date: input.endWorkOrderDate,
        net_work_cost: input.netWorkCost,
        total_vat_cost: input.totalVatCost,
        final_cost: input.netWorkCost + input.totalVatCost,
        status: WorkOrderStatus.CREATED,
        Client: {
          connect: {
            id: input.client_id
          }
        },

        WorkOrderMaterials: {
          createMany: {
            data: input.workOrderMaterials.map((wm) => ({
              unitPrice: wm.unitPrice,
              material_id: wm.material_id,
              square_meters: wm.squareMeters
            }))
          }
        }
      }
    });

    return FromWorkOrderEntityToWorkOrderModel(workOrder);
  }

  async findAll(input: FindAllWorkOrderInput): Promise<WorkOrder[]> {
    const workOrders = await this.prisma.workOrder.findMany({
      include: this.include,
      where: {
        AND: [
          {
            ...(input.filters.clientId && {
              client_id: input.filters.clientId
            })
          },
          {
            ...(input.filters.isInvoiceSended && {
              is_invoice_sended: input.filters.isInvoiceSended
            })
          },
          {
            ...(input.filters.materialId && {
              WorkOrderMaterials: {
                some: {
                  material_id: { in: input.filters.materialId }
                }
              }
            })
          },
          {
            ...(input.filters.periodDateFrom && {
              end_work_date: { gte: input.filters.periodDateFrom }
            })
          },
          {
            ...(input.filters.periodDateTo && {
              start_work_date: { lte: input.filters.periodDateTo }
            })
          },
          {
            ...(input.filters.workOrderStatus && {
              status: input.filters.workOrderStatus
            })
          },
          {
            ...(input.filters.city && {
              Client: {
                city: input.filters.workOrderStatus
              }
            })
          }
        ],
        ...(input.filters.search && {
          OR: [
            {
              Client: {
                first_name: {
                  contains: input.filters.search,
                  mode: 'insensitive'
                }
              }
            },
            {
              Client: {
                last_name: {
                  contains: input.filters.search,
                  mode: 'insensitive'
                }
              }
            },
            {
              WorkOrderMaterials: {
                some: {
                  Material: {
                    name: {
                      contains: input.filters.search,
                      mode: 'insensitive'
                    }
                  }
                }
              }
            }
          ]
        })
      }
    });

    return workOrders.map(FromWorkOrderEntityToWorkOrderModel);
  }

  async getOne(input: { id: string }): Promise<WorkOrder> {
    const workOrder = await this.prisma.workOrder.findUnique({
      include: this.include,
      where: { id: input.id }
    });
    return FromWorkOrderEntityToWorkOrderModel(workOrder);
  }

  async update(input: UpdateWorkOrderInput): Promise<WorkOrder> {
    const workOrder = await this.prisma.workOrder.update({
      include: this.include,
      where: { id: input.id },
      data: {
        end_work_date: input.data.endWorkOrderDate,
        start_work_date: input.data.startWorkOrderDate,
        is_invoice_sended: input.data.isInvoiceSended,
        net_work_cost: input.data.netWorkCost,
        total_vat_cost: input.data.totalVatCost,
        final_cost: input.data.finalCost
      }
    });

    return FromWorkOrderEntityToWorkOrderModel(workOrder);
  }

  async updateStatus(input: UpdateStatusWorkOrderInput): Promise<WorkOrder> {
    const workOrder = await this.prisma.workOrder.update({
      include: this.include,
      where: {
        id: input.id
      },
      data: {
        status: FormWorkOrderStatusToWorkOrderStatusPrisma(input.data.status)
      }
    });

    return FromWorkOrderEntityToWorkOrderModel(workOrder);
  }

  async delete(input: { id: string }): Promise<void> {
    await this.prisma.workOrder.delete({
      where: { id: input.id }
    });
  }
}
