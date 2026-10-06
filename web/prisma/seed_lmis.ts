import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding LMIS data...");

  // Clear existing LMIS data (optional, but good for idempotency)
  await prisma.alert.deleteMany({});
  await prisma.gapAnalysis.deleteMany({});
  await prisma.forecast.deleteMany({});
  await prisma.trainingCapacity.deleteMany({});
  await prisma.labourDemandSignal.deleteMany({});
  await prisma.trade.deleteMany({});
  await prisma.sector.deleteMany({});
  await prisma.location.deleteMany({});

  // 1. Create Location
  const locNanded = await prisma.location.create({
    data: { state: "Maharashtra", district: "Nanded" }
  });
  const locPune = await prisma.location.create({
    data: { state: "Maharashtra", district: "Pune" }
  });

  // 2. Create Sectors
  const secElectrical = await prisma.sector.create({
    data: { name: "Electrical & Electronics", description: "Electrical maintenance, repair, and installations." }
  });
  const secIT = await prisma.sector.create({
    data: { name: "IT & ITeS", description: "Information Technology and Software." }
  });
  const secManufacturing = await prisma.sector.create({
    data: { name: "Manufacturing", description: "Heavy and light manufacturing." }
  });

  // 3. Create Trades
  const tradeElectrician = await prisma.trade.create({
    data: { name: "Electrician", sectorId: secElectrical.id, ncoCode: "7137.0100", nsqfLevel: 4 }
  });
  const tradeDataEntry = await prisma.trade.create({
    data: { name: "Data Entry Operator", sectorId: secIT.id, ncoCode: "4132.0402", nsqfLevel: 3 }
  });
  const tradeCNC = await prisma.trade.create({
    data: { name: "CNC Machinist", sectorId: secManufacturing.id, ncoCode: "7223.0501", nsqfLevel: 4 }
  });

  // 4. Create Demand Signals & Capacity for Electrician in Nanded (as per user demo request)
  // Current Demand: 8,500, Training Capacity: 5,200
  await prisma.labourDemandSignal.createMany({
    data: [
      { tradeId: tradeElectrician.id, locationId: locNanded.id, value: 4000, source: "NCS", period: "2024-Q1" },
      { tradeId: tradeElectrician.id, locationId: locNanded.id, value: 3000, source: "JOB_PORTAL", period: "2024-Q1" },
      { tradeId: tradeElectrician.id, locationId: locNanded.id, value: 1500, source: "INDUSTRY", period: "2024-Q1" }
    ]
  }); // Total = 8500

  await prisma.trainingCapacity.create({
    data: {
      tradeId: tradeElectrician.id,
      locationId: locNanded.id,
      capacity: 5200,
      instituteCount: 12,
      period: "2024-Q1"
    }
  });

  const gapNandedElectrician = await prisma.gapAnalysis.create({
    data: {
      tradeId: tradeElectrician.id,
      locationId: locNanded.id,
      currentDemand: 8500,
      currentCapacity: 5200,
      gap: -3300, // capacity - demand (negative = shortage)
      status: "UNDERSUPPLY",
      severity: "HIGH_SHORTAGE",
      period: "2024-Q1"
    }
  });

  await prisma.alert.create({
    data: {
      gapAnalysisId: gapNandedElectrician.id,
      message: "High shortage of Electricians detected in Nanded. Increase training capacity.",
      priority: "HIGH"
    }
  });

  await prisma.forecast.create({
    data: {
      tradeId: tradeElectrician.id,
      locationId: locNanded.id,
      horizonMonths: 12,
      forecastedDemand: 9800,
      forecastedCapacity: 5200,
      trend: "UP"
    }
  });

  // 5. Create Data Entry Operator in Pune (OVERSUPPLY demo)
  // Demand: 2100, Capacity: 5800
  await prisma.labourDemandSignal.create({
    data: { tradeId: tradeDataEntry.id, locationId: locPune.id, value: 2100, source: "NCS", period: "2024-Q1" }
  });
  await prisma.trainingCapacity.create({
    data: { tradeId: tradeDataEntry.id, locationId: locPune.id, capacity: 5800, instituteCount: 25, period: "2024-Q1" }
  });
  const gapPuneDEO = await prisma.gapAnalysis.create({
    data: {
      tradeId: tradeDataEntry.id,
      locationId: locPune.id,
      currentDemand: 2100,
      currentCapacity: 5800,
      gap: 3700,
      status: "OVERSUPPLY",
      severity: "SEVERE_OVERSUPPLY",
      period: "2024-Q1"
    }
  });
  await prisma.alert.create({
    data: {
      gapAnalysisId: gapPuneDEO.id,
      message: "Severe oversupply of Data Entry Operators in Pune. Reduce capacity or pivot training.",
      priority: "MEDIUM"
    }
  });
  await prisma.forecast.create({
    data: {
      tradeId: tradeDataEntry.id,
      locationId: locPune.id,
      horizonMonths: 12,
      forecastedDemand: 1800,
      forecastedCapacity: 5800,
      trend: "DOWN"
    }
  });

  // 6. CNC Machinist in Pune (CRITICAL SHORTAGE)
  await prisma.labourDemandSignal.create({
    data: { tradeId: tradeCNC.id, locationId: locPune.id, value: 12000, source: "INDUSTRY", period: "2024-Q1" }
  });
  await prisma.trainingCapacity.create({
    data: { tradeId: tradeCNC.id, locationId: locPune.id, capacity: 2000, instituteCount: 5, period: "2024-Q1" }
  });
  await prisma.gapAnalysis.create({
    data: {
      tradeId: tradeCNC.id,
      locationId: locPune.id,
      currentDemand: 12000,
      currentCapacity: 2000,
      gap: -10000,
      status: "UNDERSUPPLY",
      severity: "CRITICAL_SHORTAGE",
      period: "2024-Q1"
    }
  });
  
  console.log("LMIS data seeded successfully.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
