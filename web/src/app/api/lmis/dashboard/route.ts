import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const state = url.searchParams.get("state");
    const district = url.searchParams.get("district");
    const sectorId = url.searchParams.get("sectorId");
    const tradeId = url.searchParams.get("tradeId");

    // Build the where clause for gap analysis (the main metric table)
    let whereClause: any = {};
    if (state || district) {
      whereClause.location = {};
      if (state) whereClause.location.state = state;
      if (district) whereClause.location.district = district;
    }
    if (sectorId || tradeId) {
      whereClause.trade = {};
      if (sectorId) whereClause.trade.sectorId = sectorId;
      if (tradeId) whereClause.trade.id = tradeId;
    }

    const gapAnalyses = await prisma.gapAnalysis.findMany({
      where: whereClause,
      include: {
        trade: { include: { sector: true } },
        location: true,
        alerts: true,
      },
      orderBy: { gap: 'asc' } // Most negative gap (shortage) first
    });

    // Also get forecasts for these
    const tradeIds = gapAnalyses.map(g => g.tradeId);
    const locationIds = gapAnalyses.map(g => g.locationId);
    
    const forecasts = await prisma.forecast.findMany({
      where: {
        tradeId: { in: tradeIds },
        locationId: { in: locationIds }
      }
    });

    let totalDemand = 0;
    let totalCapacity = 0;
    
    gapAnalyses.forEach(g => {
      totalDemand += g.currentDemand;
      totalCapacity += g.currentCapacity;
    });

    const gap = totalCapacity - totalDemand;

    // Separate into undersupply and oversupply for the top metrics
    const oversupplied = gapAnalyses.filter(g => g.gap > 0);
    const undersupplied = gapAnalyses.filter(g => g.gap < 0);

    return NextResponse.json({
      metrics: {
        totalDemand,
        totalCapacity,
        gap,
        oversuppliedTradesCount: oversupplied.length,
        undersuppliedTradesCount: undersupplied.length,
      },
      gapAnalyses,
      forecasts,
    });
  } catch (error) {
    console.error("LMIS API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
