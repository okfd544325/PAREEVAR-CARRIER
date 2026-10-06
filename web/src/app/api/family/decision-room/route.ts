import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const role = (session.user as any).role;
    const url = new URL(req.url);
    const roomId = url.searchParams.get("roomId");

    let decisionRoom;

    if (roomId) {
      decisionRoom = await prisma.familyDecisionRoom.findUnique({
        where: { id: roomId },
        include: {
          studentProfile: { include: { user: true, careerPreferences: true } },
          parentProfile: { include: { user: true, concerns: true, preferences: true } },
          conflicts: true,
          comparisons: true,
          actionPlans: true,
        }
      });
    } else {
      // Find the most recent decision room for this user
      if (role === "STUDENT") {
        const studentProfile = await prisma.studentProfile.findUnique({ where: { userId } });
        if (studentProfile) {
          decisionRoom = await prisma.familyDecisionRoom.findFirst({
            where: { studentProfileId: studentProfile.id },
            include: {
              studentProfile: { include: { user: true, careerPreferences: true } },
              parentProfile: { include: { user: true, concerns: true, preferences: true } },
              conflicts: true,
              comparisons: true,
              actionPlans: true,
            },
            orderBy: { createdAt: 'desc' }
          });
        }
      } else if (role === "PARENT") {
        const parentProfile = await prisma.parentProfile.findUnique({ where: { userId } });
        if (parentProfile) {
          decisionRoom = await prisma.familyDecisionRoom.findFirst({
            where: { parentProfileId: parentProfile.id },
            include: {
              studentProfile: { include: { user: true, careerPreferences: true } },
              parentProfile: { include: { user: true, concerns: true, preferences: true } },
              conflicts: true,
              comparisons: true,
              actionPlans: true,
            },
            orderBy: { createdAt: 'desc' }
          });
        }
      }
    }

    if (!decisionRoom) {
      // For demo, let's auto-create one if family member links exist
      if (role === "PARENT") {
        const familyMember = await prisma.familyMember.findFirst({
          where: { userId, authorized: true }
        });
        if (familyMember) {
          const studentProfile = await prisma.studentProfile.findUnique({
            where: { userId: familyMember.studentId }
          });
          const parentProfile = await prisma.parentProfile.findUnique({
            where: { userId }
          });
          
          if (studentProfile && parentProfile) {
            decisionRoom = await prisma.familyDecisionRoom.create({
              data: {
                studentProfileId: studentProfile.id,
                parentProfileId: parentProfile.id,
              },
              include: {
                studentProfile: { include: { user: true, careerPreferences: true } },
                parentProfile: { include: { user: true, concerns: true, preferences: true } },
                conflicts: true,
                comparisons: true,
                actionPlans: true,
              }
            });
          }
        }
      } else if (role === "STUDENT") {
         const familyMember = await prisma.familyMember.findFirst({
          where: { studentId: userId, authorized: true }
        });
        if (familyMember) {
          const studentProfile = await prisma.studentProfile.findUnique({
            where: { userId }
          });
          const parentProfile = await prisma.parentProfile.findUnique({
            where: { userId: familyMember.userId }
          });
          
          if (studentProfile && parentProfile) {
            decisionRoom = await prisma.familyDecisionRoom.create({
              data: {
                studentProfileId: studentProfile.id,
                parentProfileId: parentProfile.id,
              },
              include: {
                studentProfile: { include: { user: true, careerPreferences: true } },
                parentProfile: { include: { user: true, concerns: true, preferences: true } },
                conflicts: true,
                comparisons: true,
                actionPlans: true,
              }
            });
          }
        }
      }
      
      if (!decisionRoom) {
        return NextResponse.json({ error: "No active decision room found." }, { status: 404 });
      }
    }

    // Task 5: Deterministic Conflict Detection Engine
    // Check if we need to detect conflicts
    const studentPrefs = decisionRoom.studentProfile.careerPreferences || [];
    const parentPrefs = decisionRoom.parentProfile.preferences || [];
    
    // For demo purposes, we will mock preferences if empty to show the flow
    let studentPrefStr = studentPrefs.length > 0 ? studentPrefs[0].careerName : "Electrician";
    let parentPrefStr = parentPrefs.length > 0 ? parentPrefs[0].careerName : "B.Com";

    let conflictStatus = "NO_CONFLICT";
    let conflicts = decisionRoom.conflicts;

    if (studentPrefStr.toLowerCase() !== parentPrefStr.toLowerCase()) {
      conflictStatus = "CONFLICT_DETECTED";
      if (conflicts.length === 0) {
        // Create conflict
        const newConflict = await prisma.careerConflict.create({
          data: {
            familyDecisionRoomId: decisionRoom.id,
            conflictType: "CAREER",
            studentPref: studentPrefStr,
            parentPref: parentPrefStr,
            severity: "HIGH",
            reason: "The preferred career pathways differ."
          }
        });
        conflicts = [newConflict];
        
        await prisma.familyDecisionRoom.update({
          where: { id: decisionRoom.id },
          data: { status: "CONFLICT_DETECTED" }
        });
      }
    }

    return NextResponse.json({ 
      room: decisionRoom,
      status: conflictStatus,
      conflicts,
      studentPref: studentPrefStr,
      parentPref: parentPrefStr,
      parentConcerns: decisionRoom.parentProfile.concerns || []
    });
  } catch (error) {
    console.error("Decision Room GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
