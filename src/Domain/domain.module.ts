import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/Persistence/persistence.module';
import { CreateClientUseCase } from './Client/useCase/CreateClientUseCase/CreateClientUseCase';
import { DeleteClientUseCase } from './Client/useCase/DeleteClientUseCase/DeleteClientUseCase';
import { FindAllClientUseCase } from './Client/useCase/FindAllClientUseCase/FindAllClientUseCase';
import { GetClientUseCase } from './Client/useCase/GetClientUseCase/GetClientUseCase';
import { UpdateClientUseCase } from './Client/useCase/UpdateClientUseCase/UpdateClientUseCase';
import { CreateMaterialUseCase } from './Material/useCase/CreateMaterialUseCase/CreateMaterialUseCase';
import { DeleteMaterialUseCase } from './Material/useCase/DeleteMaterialUseCase/DeleteMaterialUseCase';
import { FindAllMaterialUseCase } from './Material/useCase/FindAllMaterialUseCase/FindAllMaterialUseCase';
import { GetMaterialUseCase } from './Material/useCase/GetMaterialUseCase/GetMaterialUseCase';
import { UpdateMaterialUseCase } from './Material/useCase/UpdateMaterialUseCase/UpdateMaterialUseCase';
import { CreateSupplierUseCase } from './Supplier/useCase/CreateSupplierUseCase/CreateSupplierUseCase';
import { DeleteSupplierUseCase } from './Supplier/useCase/DeleteSupplierUseCase/DeleteSupplierUseCase';
import { FindAllSupplierUseCase } from './Supplier/useCase/FindAllSupplierUseCase/FindAllSupplierUseCase';
import { GetSupplierUseCase } from './Supplier/useCase/GetSupplierUseCase/GetSupplierUseCase';
import { UpdateSupplierUseCase } from './Supplier/useCase/UpdateSupplierUseCase/UpdateSupplierUseCase';
import { CreateWorkOrderMaterialUseCase } from './WorkOrderMaterial/useCase/CreateWorkOrderMaterialUseCase/CreateWorkOrderMaterialUseCase';
import { DeleteWorkOrderMaterialUseCase } from './WorkOrderMaterial/useCase/DeleteWorkOrderMaterialUseCase/DeleteWorkOrderMaterialUseCase';
import { UpdateWorkOrderMaterialUseCase } from './WorkOrderMaterial/useCase/UpdateWorkOrderMaterialUseCase/UpdateWorkOrderMaterialUseCase';
import { CreateWorkOrderUseCase } from './WorkOrder/useCase/CreateWorkOrderUseCase/CreateWorkOrderUseCase';
import { DeleteWorkOrderUseCase } from './WorkOrder/useCase/DeleteWorkOrderUseCase/DeleteWorkOrderUseCase';
import { FindAllWorkOrderUseCase } from './WorkOrder/useCase/FindAllWorkOrderUseCase/FindAllWorkOrderUseCase';
import { GetWorkOrderUseCase } from './WorkOrder/useCase/GetWorkOrderUseCase/GetWorkOrderUseCase';
import { UpdateWorkOrderUseCase } from './WorkOrder/useCase/UpdateWorkOrderUseCase/UpdateWorkOrderUseCase';

const providers = [
  //Client
  CreateClientUseCase,
  DeleteClientUseCase,
  FindAllClientUseCase,
  GetClientUseCase,
  UpdateClientUseCase,
  //Material
  CreateMaterialUseCase,
  DeleteMaterialUseCase,
  FindAllMaterialUseCase,
  GetMaterialUseCase,
  UpdateMaterialUseCase,
  //Supplier
  CreateSupplierUseCase,
  DeleteSupplierUseCase,
  FindAllSupplierUseCase,
  GetSupplierUseCase,
  UpdateSupplierUseCase,
  //WorkOrder
  CreateWorkOrderUseCase,
  DeleteWorkOrderUseCase,
  FindAllWorkOrderUseCase,
  GetWorkOrderUseCase,
  UpdateWorkOrderUseCase,
  //WorkOrderMaterial
  CreateWorkOrderMaterialUseCase,
  DeleteWorkOrderMaterialUseCase,
  UpdateWorkOrderMaterialUseCase
];

@Module({
  imports: [PersistenceModule],
  providers: [...providers],
  exports: [...providers]
})
export class DomainModule {}
