import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const tradeId = url.searchParams.get("tradeId");
    const locationId = url.searchParams.get("locationId");

    if (!tradeId || !locationId) {
      return NextResponse.json({ error: "Missing tradeId or locationId" }, { status: 400 });
    }

    const trade = await prisma.trade.findUnique({
      where: { id: tradeId },
      include: { sector: true }
    });

    const location = await prisma.location.findUnique({
      where: { id: locationId }
    });

    const demandSignals = await prisma.labourDemandSignal.findMany({
      where: { tradeId, locationId }
    });

    const trainingCapacity = await prisma.trainingCapacity.findMany({
      where: { tradeId, locationId }
    });

    const gapAnalysis = await prisma.gapAnalysis.findFirst({
      where: { tradeId, locationId },
      include: { alerts: true }
    });

    const forecast = await prisma.forecast.findFirst({
      where: { tradeId, locationId }
    });

    return NextResponse.json({
      trade,
      location,
      demandSignals,
      trainingCapacity,
      gapAnalysis,
      forecast
    });
  } catch (error) {
    console.error("LMIS Planner API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
