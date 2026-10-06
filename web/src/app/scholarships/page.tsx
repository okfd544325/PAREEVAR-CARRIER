import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function ScholarshipsPage() {
  const session = await getServerSession();
  if (!session?.user?.email) redirect("/login");

  const scholarships = await prisma.scholarship.findMany({
    orderBy: { deadline: 'asc' }
  });

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 text-white space-y-12 mt-12 pb-32">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold uppercase tracking-wider mb-2">
          Financial Aid
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Active <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Scholarships</span></h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          Explore grants and financial aid to support your educational journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map(scholarship => (
          <div key={scholarship.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 hover:bg-white/10 transition-colors flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{scholarship.title}</h3>
              <p className="text-primary font-bold text-2xl mb-4">₹{scholarship.amount.toLocaleString()}</p>
              <div className="space-y-3">
                <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                  <p className="text-xs font-bold text-white/40 uppercase mb-1">Eligibility</p>
                  <p className="text-sm text-white/80">{scholarship.eligibility}</p>
                </div>
                <div className="bg-black/30 p-3 rounded-xl border border-white/5 flex justify-between items-center">
                  <p className="text-xs font-bold text-white/40 uppercase">Deadline</p>
                  <p className="text-sm font-bold text-red-400">{new Date(scholarship.deadline).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            {scholarship.officialSource && (
              <a href={scholarship.officialSource} target="_blank" rel="noopener noreferrer" className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold rounded-xl transition-colors text-center inline-block">
                Apply Now
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
