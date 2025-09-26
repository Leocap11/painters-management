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
import { CreateMaterialUseCase } from 'src/Domain/Material/useCase/CreateMaterialUseCase/CreateMaterialUseCase';
import { DeleteMaterialUseCase } from 'src/Domain/Material/useCase/DeleteMaterialUseCase/DeleteMaterialUseCase';
import { FindAllMaterialUseCase } from 'src/Domain/Material/useCase/FindAllMaterialUseCase/FindAllMaterialUseCase';
import { GetMaterialUseCase } from 'src/Domain/Material/useCase/GetMaterialUseCase/GetMaterialUseCase';
import { UpdateMaterialUseCase } from 'src/Domain/Material/useCase/UpdateMaterialUseCase/UpdateMaterialUseCase';
import { MaterialResponseDTO } from './dto/response';
import {
  buildPagedResponse,
  buildSuccessResponse,
  PagedResponseDto,
  ResponseDTO
} from 'src/shared/utils/utils';
import { FindAllMaterialUseCaseCommand } from 'src/Domain/Material/useCase/FindAllMaterialUseCase/FindAllMaterialUseCase.command';
import { FromMaterialModelToMaterialResponseDTO } from './mapper/mapper';
import { nonNull } from 'src/shared/utils/nonNull';
import {
  CreateMaterialRequestDTO,
  UpdateMaterialRequestDTO
} from './dto/request';

@Controller('materials')
export class MaterialController {
  constructor(
    private readonly createMaterialUseCase: CreateMaterialUseCase,
    private readonly updateMaterialUseCase: UpdateMaterialUseCase,
    private readonly getMaterialUseCase: GetMaterialUseCase,
    private readonly findAllMaterialUseCase: FindAllMaterialUseCase,
    private readonly deleteMaterialUseCase: DeleteMaterialUseCase
  ) {}

  @Get()
  async getAllMaterials(
    @Query('pageNumber', new ParseIntPipe({ optional: true }))
    pageNumber?: number,
    @Query('pageSize', new ParseIntPipe({ optional: true })) pageSize?: number,
    @Query('productCode') productCode?: string,
    @Query('supplierId') supplierId?: string,
    @Query('name') name?: string,
    @Query('search') search?: string
  ): Promise<PagedResponseDto<MaterialResponseDTO[]>> {
    const filters: FindAllMaterialUseCaseCommand['filters'] = {};

    if (productCode) filters.productCode = productCode;
    if (supplierId) filters.supplierId = supplierId;
    if (name) filters.name = name;
    if (search) filters.search = search;

    const materials = await this.findAllMaterialUseCase.run({
      pagination: {
        pageNumber: pageNumber ?? 1,
        pageSize: pageSize ?? 20
      },
      filters
    });

    return buildPagedResponse(
      materials.data.map(FromMaterialModelToMaterialResponseDTO),
      materials.pagination
    );
  }

  @Get(':id')
  async getMaterial(
    @Param('id') id: string
  ): Promise<ResponseDTO<MaterialResponseDTO>> {
    const material = nonNull(await this.getMaterialUseCase.run({ id: id }));

    return buildSuccessResponse(
      FromMaterialModelToMaterialResponseDTO(material)
    );
  }

  @Post()
  async createMaterial(
    @Body() body: CreateMaterialRequestDTO
  ): Promise<ResponseDTO<MaterialResponseDTO>> {
    const material = await this.createMaterialUseCase.run(body);

    return buildSuccessResponse(
      FromMaterialModelToMaterialResponseDTO(material)
    );
  }

  @Patch(':id')
  async updateMaterial(
    @Param('id') id: string,
    @Body() body: UpdateMaterialRequestDTO
  ): Promise<ResponseDTO<MaterialResponseDTO>> {
    const material = await this.updateMaterialUseCase.run({
      id: id,
      data: body
    });

    return buildSuccessResponse(
      FromMaterialModelToMaterialResponseDTO(material)
    );
  }

  @Delete(':id')
  async deleteMaterial(@Param('id') id: string): Promise<void> {
    await this.deleteMaterialUseCase.run({ id: id });
  }
}
