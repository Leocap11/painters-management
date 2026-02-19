import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { CreateWorkOrderUseCase } from 'src/Domain/WorkOrder/useCase/CreateWorkOrderUseCase/CreateWorkOrderUseCase';
import { DeleteWorkOrderUseCase } from 'src/Domain/WorkOrder/useCase/DeleteWorkOrderUseCase/DeleteWorkOrderUseCase';
import { FindAllWorkOrderUseCase } from 'src/Domain/WorkOrder/useCase/FindAllWorkOrderUseCase/FindAllWorkOrderUseCase';
import { GetWorkOrderUseCase } from 'src/Domain/WorkOrder/useCase/GetWorkOrderUseCase/GetWorkOrderUseCase';
import { UpdateWorkOrderUseCase } from 'src/Domain/WorkOrder/useCase/UpdateWorkOrderUseCase/UpdateWorkOrderUseCase';
import { CreateWorkOrderMaterialUseCase } from 'src/Domain/WorkOrderMaterial/useCase/CreateWorkOrderMaterialUseCase/CreateWorkOrderMaterialUseCase';
import {
  buildPagedResponse,
  buildSuccessResponse,
  PagedResponseDto,
  ResponseDTO
} from 'src/shared/utils/utils';
import { WorkOrderResponseDTO } from './dto/response';
import { FindAllWorkOrderUseCaseCommand } from 'src/Domain/WorkOrder/useCase/FindAllWorkOrderUseCase/FindAllWorkOrderUseCase.command';
import { FromWorkOrderModelToWorkOrderResponseDTO } from './mapper/mapper';
import { WorkOrderStatusModel } from 'src/Domain/WorkOrder/model/workOrder.model';
import { nonNull } from 'src/shared/utils/nonNull';
import {
  CreateWorkOrderRequestDTO,
  UpdateWorkOrderRequestDTO
} from './dto/request';
import { WorkOrderMaterialResponseDTO } from '../WorkOrderMaterial/dto/response';
import {
  CreateWorkOrderMaterialRequestDTO,
  UpdateWorkOrderMaterialRequestDTO
} from '../WorkOrderMaterial/dto/request';
import { FromWorkOrderMaterialModelToWorkOrderMaterialResponseDTO } from '../WorkOrderMaterial/mapper/mapper';
import { Temporal } from '@js-temporal/polyfill';
import { DeleteWorkOrderMaterialUseCase } from 'src/Domain/WorkOrderMaterial/useCase/DeleteWorkOrderMaterialUseCase/DeleteWorkOrderMaterialUseCase';
import { UpdateWorkOrderMaterialUseCase } from 'src/Domain/WorkOrderMaterial/useCase/UpdateWorkOrderMaterialUseCase/UpdateWorkOrderMaterialUseCase';

@Controller('work-orders')
export class WorkOrderController {
  constructor(
    private readonly createWorkOrderUseCase: CreateWorkOrderUseCase,
    private readonly updateWorkOrderUseCase: UpdateWorkOrderUseCase,
    private readonly getWorkOrderUseCase: GetWorkOrderUseCase,
    private readonly findAllWorkOrderUseCase: FindAllWorkOrderUseCase,
    private readonly deleteWorkOrderUseCase: DeleteWorkOrderUseCase,
    private readonly createWorkOrderMaterialUseCase: CreateWorkOrderMaterialUseCase,
    private readonly updateWorkOrderMaterialUseCase: UpdateWorkOrderMaterialUseCase,
    private readonly deleteWorkOrderMaterialUseCase: DeleteWorkOrderMaterialUseCase
  ) {}

  @Get()
  async getAllWorkOrders(
    @Query('pageNumber', new ParseIntPipe({ optional: true }))
    pageNumber?: number,
    @Query('pageSize', new ParseIntPipe({ optional: true })) pageSize?: number,
    @Query('city') city?: string,
    @Query('clientId') clientId?: string,
    @Query('materialIds') materialIds?: string[],
    @Query('periodDateFrom') periodDateFrom?: string,
    @Query('periodDateTo') periodDateTo?: string,
    @Query('workOrderStatus') workOrderStatus?: WorkOrderStatusModel,
    @Query('isInvoiceSended') isInvoiceSended?: boolean,
    @Query('currentDate') currentDate?: string,
    @Query('search') search?: string
  ): Promise<PagedResponseDto<WorkOrderResponseDTO[]>> {
    const filters: FindAllWorkOrderUseCaseCommand['filters'] = {};

    if (city) filters.city = city;
    if (clientId) filters.clientId = clientId;
    if (isInvoiceSended) filters.isInvoiceSended = isInvoiceSended;
    if (materialIds) filters.materialIds = materialIds;
    if (periodDateFrom)
      filters.periodDateFrom = Temporal.PlainDate.from(periodDateFrom);
    if (periodDateTo)
      filters.periodDateTo = Temporal.PlainDate.from(periodDateTo);
    if (workOrderStatus) filters.workOrderStatus = workOrderStatus;
    if (currentDate) filters.currentDate = Temporal.PlainDate.from(currentDate);
    if (search) filters.search = search;

    const workOrders = await this.findAllWorkOrderUseCase.run({
      pagination: {
        pageNumber: pageNumber ?? 1,
        pageSize: pageSize ?? 20
      },
      filters
    });

    return buildPagedResponse(
      workOrders.data.map(FromWorkOrderModelToWorkOrderResponseDTO),
      workOrders.pagination
    );
  }

  @Get(':id')
  async getWorkOrder(
    @Param('id') id: string
  ): Promise<ResponseDTO<WorkOrderResponseDTO>> {
    const workOrder = nonNull(await this.getWorkOrderUseCase.run({ id: id }));

    return buildSuccessResponse(
      FromWorkOrderModelToWorkOrderResponseDTO(workOrder)
    );
  }

  @Post()
  async createWorkOrder(
    @Body() body: CreateWorkOrderRequestDTO
  ): Promise<ResponseDTO<WorkOrderResponseDTO>> {
    const workOrder = await this.createWorkOrderUseCase.run({
      ...body,
      startWorkOrderDate: Temporal.PlainDate.from(body.startWorkOrderDate),
      endWorkOrderDate: Temporal.PlainDate.from(body.endWorkOrderDate)
    });

    return buildSuccessResponse(
      FromWorkOrderModelToWorkOrderResponseDTO(workOrder)
    );
  }

  @Patch(':id')
  async updateWorkOrder(
    @Param('id') id: string,
    @Body() body: UpdateWorkOrderRequestDTO
  ): Promise<ResponseDTO<WorkOrderResponseDTO>> {
    const workOrder = await this.updateWorkOrderUseCase.run({
      id: id,
      data: {
        ...body,
        endWorkOrderDate: body.endWorkOrderDate
          ? Temporal.PlainDate.from(body.endWorkOrderDate)
          : undefined,
        startWorkOrderDate: body.startWorkOrderDate
          ? Temporal.PlainDate.from(body.startWorkOrderDate)
          : undefined
      }
    });

    return buildSuccessResponse(
      FromWorkOrderModelToWorkOrderResponseDTO(workOrder)
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteWorkOrder(@Param('id') id: string): Promise<void> {
    await this.deleteWorkOrderUseCase.run({ id: id });
  }

  /*
  private readonly updateWorkOrderMaterialUseCase: UpdateWorkOrderMaterialUseCase,
  private readonly deleteWorkOrderMaterialUseCase: DeleteWorkOrderMaterialUseCase
  */

  @Post(':id/add-material')
  async addMaterial(
    @Param('id') workOrderId: string,
    @Body() body: CreateWorkOrderMaterialRequestDTO
  ): Promise<ResponseDTO<WorkOrderMaterialResponseDTO>> {
    const workOrderMaterial = await this.createWorkOrderMaterialUseCase.run({
      ...body,
      workOrderId: workOrderId
    });

    return buildSuccessResponse(
      FromWorkOrderMaterialModelToWorkOrderMaterialResponseDTO(
        workOrderMaterial
      )
    );
  }

  @Patch('/:id/update-material/:materialId')
  async updateWorkOrderMaterial(
    @Param('id') id: string,
    @Body()
    body: UpdateWorkOrderMaterialRequestDTO
  ): Promise<ResponseDTO<WorkOrderMaterialResponseDTO>> {
    const material = await this.updateWorkOrderMaterialUseCase.run({
      id: id,
      data: body
    });

    return buildSuccessResponse(
      FromWorkOrderMaterialModelToWorkOrderMaterialResponseDTO(material)
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id/remove-material/:materialId')
  async deleteWorkOrderMaterial(
    @Param('id') id: string,
    @Param('materialId') materialId: string
  ): Promise<void> {
    await this.deleteWorkOrderMaterialUseCase.run({
      id: materialId,
      workOrderId: id
    });
  }
}
