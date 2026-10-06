"use server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function saveStudentProfile(formData: FormData) {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  // Get user from DB
  let user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: session.user.email,
        password: "hashed_password_demo", // For demo fallback auth
        name: session.user.name,
        role: "STUDENT"
      }
    });
  }

  const education = formData.get("education") as string;
  const stream = formData.get("stream") as string;
  const marks = parseFloat(formData.get("marks") as string);
  const location = formData.get("location") as string;
  const budget = formData.get("budget") as string;
  const interests = formData.get("interests") as string;
  const skills = formData.get("skills") as string;
  const careerGoal = formData.get("careerGoal") as string;

  await prisma.studentProfile.upsert({
    where: { userId: user.id },
    update: {
      education,
      stream,
      marks,
      location,
      budget,
      interests,
      skills,
      careerGoal
    },
    create: {
      userId: user.id,
      education,
      stream,
      marks,
      location,
      budget,
      interests,
      skills,
      careerGoal,
      coursePrefs: ""
    }
  });

  redirect("/assessment");
}

export async function saveAssessmentScores(scores: Record<string, number>) {
  const session = await getServerSession();
  if (!session?.user?.email) return;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { studentProfile: true }
  });

  if (!user?.studentProfile) return;

  await prisma.assessment.create({
    data: {
      studentProfileId: user.studentProfile.id,
      logical: scores.logical || 0,
      numerical: scores.numerical || 0,
      technical: scores.technical || 0,
      creativity: scores.creativity || 0,
      communication: scores.communication || 0,
      practical: scores.practical || 0,
      problemSolving: scores.problemSolving || 0,
    }
  });

  redirect("/recommendations");
}

export async function saveCareerPreference(careerName: string, sector: string = "") {
  const session = await getServerSession();
  if (!session?.user?.email) return;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { studentProfile: true }
  });

  if (!user?.studentProfile) return;

  await prisma.studentCareerPreference.create({
    data: {
      studentProfileId: user.studentProfile.id,
      careerName,
      sector
    }
  });
}
