import { nonNull } from './../../shared/utils/nonNull';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { CreateSupplierUseCase } from 'src/Domain/Supplier/useCase/CreateSupplierUseCase/CreateSupplierUseCase';
import { DeleteSupplierUseCase } from 'src/Domain/Supplier/useCase/DeleteSupplierUseCase/DeleteSupplierUseCase';
import { FindAllSupplierUseCase } from 'src/Domain/Supplier/useCase/FindAllSupplierUseCase/FindAllSupplierUseCase';
import { GetSupplierUseCase } from 'src/Domain/Supplier/useCase/GetSupplierUseCase/GetSupplierUseCase';
import { UpdateSupplierUseCase } from 'src/Domain/Supplier/useCase/UpdateSupplierUseCase/UpdateSupplierUseCase';
import {
  buildPagedResponse,
  buildSuccessResponse,
  PagedResponseDto,
  ResponseDTO
} from 'src/shared/utils/utils';
import { SupplierResponseDTO } from './dto/response';
import { FindAllSupplierUseCaseCommand } from 'src/Domain/Supplier/useCase/FindAllSupplierUseCase/FindAllSupplierUseCase.command';
import { FromSupplierModelToSupplierResponseDTO } from './mapper/mapper';
import {
  CreateSupplierRequestDTO,
  UpdateSupplierRequestDTO
} from './dto/request';

@Controller('suppliers')
export class SupplierController {
  constructor(
    private readonly createSupplierUseCase: CreateSupplierUseCase,
    private readonly updateSupplierUseCase: UpdateSupplierUseCase,
    private readonly getSupplierUseCase: GetSupplierUseCase,
    private readonly findAllSupplierUseCase: FindAllSupplierUseCase,
    private readonly deleteSupplierUseCase: DeleteSupplierUseCase
  ) {}

  @Get()
  async getAllSuppliers(
    @Query('pageNumber', new ParseIntPipe({ optional: true }))
    pageNumber?: number,
    @Query('pageSize', new ParseIntPipe({ optional: true })) pageSize?: number,
    @Query('city') city?: string,
    @Query('name') name?: string,
    @Query('search') search?: string
  ): Promise<PagedResponseDto<SupplierResponseDTO[]>> {
    const filters: FindAllSupplierUseCaseCommand['filters'] = {};

    if (city) filters.city = city;
    if (name) filters.name = name;
    if (search) filters.search = search;

    const suppliers = await this.findAllSupplierUseCase.run({
      pagination: {
        pageNumber: pageNumber ?? 1,
        pageSize: pageSize ?? 20
      },
      filters
    });

    return buildPagedResponse(
      suppliers.data.map(FromSupplierModelToSupplierResponseDTO),
      suppliers.pagination
    );
  }

  @Get(':id')
  async getSupplier(
    @Param('id') id: string
  ): Promise<ResponseDTO<SupplierResponseDTO>> {
    const supplier = nonNull(await this.getSupplierUseCase.run({ id: id }));

    return buildSuccessResponse(
      FromSupplierModelToSupplierResponseDTO(supplier)
    );
  }

  @Post()
  async createSupplier(
    @Body() body: CreateSupplierRequestDTO
  ): Promise<ResponseDTO<SupplierResponseDTO>> {
    const supplier = await this.createSupplierUseCase.run(body);

    return buildSuccessResponse(
      FromSupplierModelToSupplierResponseDTO(supplier)
    );
  }

  @Patch(':id')
  async updateSupplier(
    @Param('id') id: string,
    @Body() body: UpdateSupplierRequestDTO
  ): Promise<ResponseDTO<SupplierResponseDTO>> {
    const supplier = await this.updateSupplierUseCase.run({
      id: id,
      data: body
    });

    return buildSuccessResponse(
      FromSupplierModelToSupplierResponseDTO(supplier)
    );
  }

  @Delete(':id')
  async deleteSupplier(@Param('id') id: string): Promise<void> {
    await this.deleteSupplierUseCase.run({ id: id });
  }
}
