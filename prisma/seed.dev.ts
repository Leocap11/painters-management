import { PrismaClient, WorkOrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  // --- Suppliers ---
  const supplier1 = await prisma.supplier.create({
    data: {
      name: 'Edilizia Rossi SRL',
      vat_number: 'IT12345678901',
      address: 'Via Roma 12',
      city: 'Milano',
      email: 'info@rossisrl.it',
      mobile_phone: '3456789012'
    }
  });

  const supplier2 = await prisma.supplier.create({
    data: {
      name: 'Ferramenta Bianchi SPA',
      vat_number: 'IT98765432109',
      address: 'Corso Italia 45',
      city: 'Torino',
      email: 'contatti@bianchispa.it',
      telephone: '0112345678'
    }
  });

  // --- Materials ---
  const material1 = await prisma.material.create({
    data: {
      product_code: 'CEM001',
      name: 'Cemento armato',
      cost_per_square_meter: 65,
      note: 'Per strutture portanti',
      supplier_id: supplier1.id,
      vat_percentage: 22
    }
  });

  const material2 = await prisma.material.create({
    data: {
      product_code: 'LEG001',
      name: 'Legno lamellare',
      cost_per_square_meter: 120,
      note: 'Per coperture',
      supplier_id: supplier2.id,
      vat_percentage: 10
    }
  });

  const material3 = await prisma.material.create({
    data: {
      product_code: 'PIT001',
      name: 'Vernice lavabile bianca',
      cost_per_square_meter: 8,
      note: 'Per interni',
      supplier_id: supplier2.id,
      vat_percentage: 22
    }
  });

  const material4 = await prisma.material.create({
    data: {
      product_code: 'MAT001',
      name: 'Mattoni pieni',
      cost_per_square_meter: 45,
      supplier_id: supplier1.id,
      vat_percentage: 22
    }
  });

  // --- Clients ---
  const client1 = await prisma.client.create({
    data: {
      first_name: 'Luca',
      last_name: 'Verdi',
      address: 'Via Manzoni 30',
      city: 'Milano',
      fiscal_code: 'VRDLCA80A01F205X',
      vat_number: 'IT76543210987',
      mobile_phone: '3331234567',
      email: 'luca.verdi@email.com'
    }
  });

  const client2 = await prisma.client.create({
    data: {
      first_name: 'Giulia',
      last_name: 'Neri',
      address: 'Piazza Duomo 5',
      city: 'Bologna',
      fiscal_code: 'NERGLL90B41A944L',
      mobile_phone: '3209876543',
      email: 'giulia.neri@email.com'
    }
  });

  // --- Work Orders ---
  const workOrder1 = await prisma.workOrder.create({
    data: {
      client_id: client1.id,
      net_work_cost: 0, // placeholder, aggiorniamo dopo
      total_vat_cost: 0,
      final_cost: 0,
      start_work_date: new Date('2025-01-10'),
      end_work_date: new Date('2025-02-15'),
      status: WorkOrderStatus.IN_PROGRESS
    }
  });

  const workOrder2 = await prisma.workOrder.create({
    data: {
      client_id: client2.id,
      net_work_cost: 0,
      total_vat_cost: 0,
      final_cost: 0,
      start_work_date: new Date('2025-03-01'),
      end_work_date: new Date('2025-04-20'),
      status: WorkOrderStatus.CREATED
    }
  });

  // --- WorkOrderMaterials ---
  await prisma.workOrderMaterial.createMany({
    data: [
      {
        workOrder_id: workOrder1.id,
        material_id: material1.id,
        square_meters: 120,
        unitPrice: 70
      },
      {
        workOrder_id: workOrder1.id,
        material_id: material2.id,
        square_meters: 80,
        unitPrice: 130
      },
      {
        workOrder_id: workOrder2.id,
        material_id: material3.id,
        square_meters: 200,
        unitPrice: 10
      },
      {
        workOrder_id: workOrder2.id,
        material_id: material4.id,
        square_meters: 150,
        unitPrice: 50
      }
    ]
  });

  // --- Calcolo costi per ogni WorkOrder ---
  const workOrders = await prisma.workOrder.findMany({
    include: {
      WorkOrderMaterials: { include: { Material: true } }
    }
  });

  for (const wo of workOrders) {
    let netWorkCost = 0;
    let totalVatCost = 0;

    for (const wm of wo.WorkOrderMaterials) {
      const net = wm.unitPrice * wm.square_meters;
      const vat = net * (wm.Material.vat_percentage / 100);
      netWorkCost += net;
      totalVatCost += vat;
    }

    const finalCost = netWorkCost + totalVatCost;

    await prisma.workOrder.update({
      where: { id: wo.id },
      data: {
        net_work_cost: netWorkCost,
        total_vat_cost: totalVatCost,
        final_cost: finalCost
      }
    });
  }

  console.log('✅ Seed completato con costi reali e totali calcolati!');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
