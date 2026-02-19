import { GetAllDashboardCountsUseCase } from './../../Domain/Dashboard/useCase/GetAllDashboardCountsUseCase/GetAllDashboardCountsUseCase';
import { Controller, Get } from '@nestjs/common';
import { FromDashboardCountsModelToDashboardCountsResponseDTO } from './mapper/mapper';
import { buildSuccessResponse, ResponseDTO } from 'src/shared/utils/utils';
import { DashboardCountsResponseDTO } from './dto/response';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly getAllDashboardCountsUseCase: GetAllDashboardCountsUseCase
  ) {}

  @Get('/counts')
  async getAllCounts(): Promise<ResponseDTO<DashboardCountsResponseDTO>> {
    const counts = await this.getAllDashboardCountsUseCase.run();

    return buildSuccessResponse(
      FromDashboardCountsModelToDashboardCountsResponseDTO(counts)
    );
  }
}
