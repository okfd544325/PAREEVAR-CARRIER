import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        studentProfile: {
          include: {
            assessments: {
              orderBy: { createdAt: "desc" },
              take: 1
            }
          }
        }
      }
    });

    if (!user?.studentProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const profile = user.studentProfile;
    const latestAssessment = profile.assessments[0];

    if (!latestAssessment) {
      return NextResponse.json({ error: "Assessment not completed" }, { status: 400 });
    }

    // Load careers and courses
    const careers = await prisma.career.findMany({
      include: { courses: { include: { institute: true } } }
    });

    // 1. Deterministic Matching Engine
    const recommendations = careers.map(career => {
      let score = 0;
      const avgAptitude = (latestAssessment.logical + latestAssessment.technical + latestAssessment.numerical) / 3;
      score += (avgAptitude / 5) * 40;

      if (career.reqEducation.toLowerCase().includes((profile.education || "").toLowerCase())) {
        score += 30;
      } else {
        score += 15;
      }

      const userSkills = profile.skills.toLowerCase();
      const careerSkills = career.reqSkills.toLowerCase();
      if (careerSkills.split(',').some(skill => userSkills.includes(skill.trim()))) {
        score += 30;
      } else {
        score += 10;
      }

      const matchScore = Math.min(Math.round(score), 99);

      return {
        id: career.id,
        title: career.title,
        reqEducation: career.reqEducation,
        reqSkills: career.reqSkills,
        matchScore,
        explanation: `This career matches your profile with a score of ${matchScore}%. Your aptitude score averages ${(avgAptitude).toFixed(1)}/5.`,
        courses: career.courses.map(c => ({
          name: c.name,
          institute: c.institute?.name || "Unknown",
          fees: `₹${c.fees}`
        }))
      };
    });

    // Sort by match score descending
    recommendations.sort((a, b) => b.matchScore - a.matchScore);
    const topRecommendations = recommendations.slice(0, 3);

    // 2. Gemini Personalized Analysis
    try {
      const aiResponse = await fetch("http://127.0.0.1:8000/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: {
            name: user.name,
            education: profile.education || "Unknown",
            skills: profile.skills,
            interests: profile.interests.split(","),
            budget: profile.budget || "Unknown",
            location: profile.location || "Unknown",
            assessmentScores: {
              logical: latestAssessment.logical,
              technical: latestAssessment.technical,
              numerical: latestAssessment.numerical,
              creativity: latestAssessment.creativity,
              communication: latestAssessment.communication
            }
          },
          candidates: topRecommendations
        })
      });

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();
        
        if (!aiData.error && aiData.topCareers) {
          // Merge Gemini explanations into deterministic scores
          topRecommendations.forEach(rec => {
            const aiMatch = aiData.topCareers.find((c: any) => c.careerId === rec.id);
            if (aiMatch) {
              rec.explanation = aiMatch.matchExplanation + " " + aiMatch.recommendedPath;
            }
          });
        }
      }
    } catch (e) {
      console.warn("AI Service unavailable or failed. Using deterministic fallback.");
    }

    // Save recommendations to DB
    await prisma.recommendation.deleteMany({
      where: { studentProfileId: profile.id }
    });
    
    for (const rec of topRecommendations) {
      await prisma.recommendation.create({
        data: {
          studentProfileId: profile.id,
          careerId: rec.id,
          matchScore: rec.matchScore,
          explanation: rec.explanation
        }
      });
    }

    return NextResponse.json(topRecommendations);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
