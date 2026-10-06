import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RoadmapClient from "./RoadmapClient";

const prisma = new PrismaClient();

export default async function RoadmapPage() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      studentProfile: {
        include: {
          recommendations: {
            orderBy: { matchScore: "desc" },
            take: 1,
            include: { career: true }
          },
          assessments: {
            orderBy: { createdAt: "desc" },
            take: 1
          }
        }
      }
    }
  });

  const profile = user?.studentProfile;
  const topMatch = profile?.recommendations[0];

  if (!profile || !topMatch) {
    return (
      <div className="p-12 text-center text-white/60">
        <h2 className="text-2xl font-bold text-white mb-2">No active trajectory</h2>
        <p>Please execute the profile calibration and assessment first.</p>
        <a href="/onboarding" className="mt-6 inline-block px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/80 transition-colors">Initialize Profile</a>
      </div>
    );
  }

  const career = topMatch.career;
  let studentSkills = profile.skills.toLowerCase().split(',').map(s => s.trim());
  let reqSkills = career.reqSkills.split(',').map(s => s.trim());
  
  let missingSkills = reqSkills.filter(s => !studentSkills.includes(s.toLowerCase()));
  let acquiredSkills = reqSkills.filter(s => studentSkills.includes(s.toLowerCase()));
  
  let careerProgression = career.careerProgression;

  // Attempt to fetch personalized AI Skill Gap and Roadmap
  try {
    const aiPayload = {
      profile: {
        name: user.name,
        education: profile.education || "Unknown",
        skills: profile.skills,
        interests: profile.interests.split(","),
        budget: profile.budget || "Unknown",
        location: profile.location || "Unknown"
      },
      career: career,
      courses: [] // Could load courses here
    };

    // 1. Fetch Skill Gap
    const gapRes = await fetch("http://127.0.0.1:8000/skill-gap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aiPayload)
    });
    if (gapRes.ok) {
      const gapData = await gapRes.json();
      if (!gapData.error && gapData.missingSkills) {
        missingSkills = gapData.missingSkills;
        acquiredSkills = gapData.currentSkills || acquiredSkills;
      }
    }

    // 2. Fetch Roadmap
    const roadmapRes = await fetch("http://127.0.0.1:8000/roadmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aiPayload)
    });
    if (roadmapRes.ok) {
      const roadmapData = await roadmapRes.json();
      if (!roadmapData.error && roadmapData.stages) {
        // Embed the AI roadmap into the careerProgression field to reuse existing UI
        careerProgression = "AI Generated Pathway:\n" + roadmapData.stages.join("\n- ") + "\n\nProjects: " + roadmapData.practicalProjects.join(", ");
      }
    }
  } catch (e) {
    console.warn("AI Service unavailable or failed. Using deterministic fallback.");
  }

  return (
    <RoadmapClient 
      career={{ ...career, careerProgression }} 
      profile={{ ...profile, education: profile.education || "Undergraduate" }} 
      missingSkills={missingSkills} 
      acquiredSkills={acquiredSkills} 
    />
  );
}
