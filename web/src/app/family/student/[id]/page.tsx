import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function FamilyStudentView({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    redirect("/login");
  }

  const parent = await prisma.user.findUnique({ where: { email: session.user.email } });
  
  const resolvedParams = await params;
  
  // Verify authorization
  const link = await prisma.familyMember.findFirst({
    where: {
      userId: parent?.id,
      studentId: resolvedParams.id,
      authorized: true
    }
  });

  if (!link) {
    return (
      <div className="p-12 text-center text-white/60">
        <h2 className="text-2xl font-bold text-white mb-2">Unauthorized Access</h2>
        <p>You do not have permission to view this student&apos;s data. Wait for their approval.</p>
      </div>
    );
  }

  const student = await prisma.user.findUnique({
    where: { id: resolvedParams.id },
    include: {
      studentProfile: {
        include: {
          recommendations: { include: { career: true } }
        }
      }
    }
  });

  if (!student?.studentProfile) return notFound();

  const profile = student.studentProfile;
  const topMatch = profile.recommendations.sort((a, b) => b.matchScore - a.matchScore)[0];

  return (
    <div className="max-w-5xl mx-auto p-8 text-white space-y-12">
      <div>
        <h1 className="text-4xl font-extrabold mb-2">Student Profile: {student.name}</h1>
        <p className="text-white/60">Authorized Family Access</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-xl font-bold border-b border-white/10 pb-2">Academic Status</h2>
          <p><span className="text-white/60">Education:</span> {profile.education}</p>
          <p><span className="text-white/60">Skills:</span> {profile.skills}</p>
          <p><span className="text-white/60">Budget:</span> {profile.budget}</p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-xl font-bold border-b border-white/10 pb-2">Top Recommended Career</h2>
          {topMatch ? (
            <>
              <h3 className="text-2xl font-bold text-primary">{topMatch.career.title}</h3>
              <p className="text-white/80">{topMatch.explanation}</p>
              <div className="mt-4 pt-4 border-t border-white/10 flex gap-4">
                <a href={`/careers/${topMatch.career.id}`} className="text-primary font-bold hover:underline">View Career Details →</a>
              </div>
            </>
          ) : (
            <p className="text-white/60">No recommendations generated yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
