import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const gapAnalyses = await prisma.gapAnalysis.findMany({
      include: {
        trade: { include: { sector: true } },
        location: true,
        alerts: true,
      },
    });

    const forecasts = await prisma.forecast.findMany();
    
    // Map data into a flat export format suitable for CSV or JSON
    const exportData = gapAnalyses.map(gap => {
      const forecast = forecasts.find(f => f.tradeId === gap.tradeId && f.locationId === gap.locationId);
      return {
        state: gap.location.state,
        district: gap.location.district,
        sector: gap.trade.sector.name,
        trade: gap.trade.name,
        ncoCode: gap.trade.ncoCode,
        nsqfLevel: gap.trade.nsqfLevel,
        period: gap.period,
        currentDemand: gap.currentDemand,
        currentCapacity: gap.currentCapacity,
        gap: gap.gap,
        status: gap.status,
        severity: gap.severity,
        forecastDemand: forecast?.forecastedDemand || null,
        forecastTrend: forecast?.trend || null,
        alerts: gap.alerts.map(a => a.message).join(" | ")
      };
    });

    return NextResponse.json({ data: exportData });
  } catch (error) {
    console.error("LMIS Export Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
