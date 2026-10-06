import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || (session.user as any).role !== "PARENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const profile = await prisma.parentProfile.findUnique({
      where: { userId },
      include: {
        concerns: true,
        preferences: true,
      }
    });

    if (!profile) {
      return NextResponse.json({ profile: null, concerns: [] });
    }

    return NextResponse.json({ 
      profile, 
      concerns: profile.concerns,
      preferences: profile.preferences 
    });
  } catch (error) {
    console.error("Parent Profile GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || (session.user as any).role !== "PARENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { profile, concerns, preferences } = body;

    // Check if profile exists
    let dbProfile = await prisma.parentProfile.findUnique({
      where: { userId }
    });

    if (dbProfile) {
      // Update
      dbProfile = await prisma.parentProfile.update({
        where: { userId },
        data: {
          education: profile.education,
          occupation: profile.occupation,
          preferredSectors: profile.preferredSectors,
          preferredEduLevel: profile.preferredEduLevel,
          preferredLocation: profile.preferredLocation,
          budget: profile.budget,
          employmentVsHigherEdu: profile.employmentVsHigherEdu,
          vocationalWillingness: profile.vocationalWillingness,
        }
      });
    } else {
      // Create
      dbProfile = await prisma.parentProfile.create({
        data: {
          userId,
          education: profile.education,
          occupation: profile.occupation,
          preferredSectors: profile.preferredSectors,
          preferredEduLevel: profile.preferredEduLevel,
          preferredLocation: profile.preferredLocation,
          budget: profile.budget,
          employmentVsHigherEdu: profile.employmentVsHigherEdu,
          vocationalWillingness: profile.vocationalWillingness,
        }
      });
    }

    // Update concerns (delete old, create new)
    if (concerns && Array.isArray(concerns)) {
      await prisma.parentConcern.deleteMany({
        where: { parentProfileId: dbProfile.id }
      });
      await prisma.parentConcern.createMany({
        data: concerns.map(c => ({
          parentProfileId: dbProfile.id,
          concern: c.concern,
          importance: c.importance,
          isCustom: true
        }))
      });
    }

    if (preferences && Array.isArray(preferences)) {
      await prisma.parentCareerPreference.deleteMany({
        where: { parentProfileId: dbProfile.id }
      });
      await prisma.parentCareerPreference.createMany({
        data: preferences.map(p => ({
          parentProfileId: dbProfile.id,
          careerName: p.careerName,
          sector: p.sector || ""
        }))
      });
    }

    return NextResponse.json({ success: true, profile: dbProfile });
  } catch (error) {
    console.error("Parent Profile POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
