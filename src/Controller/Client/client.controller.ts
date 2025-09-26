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
import { CreateClientUseCase } from 'src/Domain/Client/useCase/CreateClientUseCase/CreateClientUseCase';
import { DeleteClientUseCase } from 'src/Domain/Client/useCase/DeleteClientUseCase/DeleteClientUseCase';
import { FindAllClientUseCase } from 'src/Domain/Client/useCase/FindAllClientUseCase/FindAllClientUseCase';
import { GetClientUseCase } from 'src/Domain/Client/useCase/GetClientUseCase/GetClientUseCase';
import { UpdateClientUseCase } from 'src/Domain/Client/useCase/UpdateClientUseCase/UpdateClientUseCase';
import {
  buildPagedResponse,
  buildSuccessResponse,
  PagedResponseDto,
  ResponseDTO
} from 'src/shared/utils/utils';
import { ClientResponseDTO } from './dto/response';
import { FindAllClientUseCaseCommand } from 'src/Domain/Client/useCase/FindAllClientUseCase/FindAllClientUseCase.command';
import { FromClientModelToClientResponseDTO } from './mapper/mapper';
import { nonNull } from 'src/shared/utils/nonNull';
import { CreateClientRequestDTO, UpdateClientRequestDTO } from './dto/request';

@Controller('clients')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly getClientUseCase: GetClientUseCase,
    private findAllClientUseCase: FindAllClientUseCase,
    private readonly deleteClientUseCase: DeleteClientUseCase
  ) {}

  @Get()
  async getAllClients(
    @Query('pageNumber', new ParseIntPipe({ optional: true }))
    pageNumber?: number,
    @Query('pageSize', new ParseIntPipe({ optional: true })) pageSize?: number,
    @Query('city') city?: string,
    @Query('search') search?: string
  ): Promise<PagedResponseDto<ClientResponseDTO[]>> {
    const filters: FindAllClientUseCaseCommand['filters'] = {};

    if (city) filters.city = city;
    if (search) filters.search = search;

    const clients = await this.findAllClientUseCase.run({
      pagination: {
        pageNumber: pageNumber ?? 1,
        pageSize: pageSize ?? 20
      },
      filters
    });

    return buildPagedResponse(
      clients.data.map(FromClientModelToClientResponseDTO),
      clients.pagination
    );
  }

  @Get(':id')
  async getClient(
    @Param('id') id: string
  ): Promise<ResponseDTO<ClientResponseDTO>> {
    const client = nonNull(await this.getClientUseCase.run({ id: id }));

    return buildSuccessResponse(FromClientModelToClientResponseDTO(client));
  }

  @Post()
  async createClient(
    @Body() body: CreateClientRequestDTO
  ): Promise<ResponseDTO<ClientResponseDTO>> {
    const client = await this.createClientUseCase.run(body);

    return buildSuccessResponse(FromClientModelToClientResponseDTO(client));
  }

  @Patch(':id')
  async updateClient(
    @Param('id') id: string,
    @Body() body: UpdateClientRequestDTO
  ): Promise<ResponseDTO<ClientResponseDTO>> {
    const client = await this.updateClientUseCase.run({
      id: id,
      data: body
    });

    return buildSuccessResponse(FromClientModelToClientResponseDTO(client));
  }

  @Delete(':id')
  async deleteClient(@Param('id') id: string): Promise<void> {
    await this.deleteClientUseCase.run({ id: id });
  }
}
