import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    
    // Simulate an AI delay
    await new Promise(r => setTimeout(r, 2000));

    const counsellingText = `
### 1. Conflict Explanation
The conflict arises from differing expectations. The student prefers a practical, hands-on path (Electrician) leading to rapid employment, whereas the parent prefers a traditional academic route (B.Com) offering perceived long-term stability and corporate opportunities.

### 2. Student Perspective
The student values practical skills and wants to enter the workforce quickly. Technical trades like Electrician offer immediate job opportunities, clear skill progression, and potential for self-employment. 

### 3. Parent Perspective
The parent is concerned about job security, social perception, and salary. A B.Com degree is viewed as a safer, more prestigious route that opens doors to corporate jobs and further education (like MBA or CA).

### 4. Evidence-Based Observations
- **Electrician**: High demand, lower initial training cost (₹10k-50k), quick entry (1-2 years). Salary grows with experience and self-employment.
- **B.Com**: Broad applicability, higher cost (₹1L-5L), longer duration (3-4 years). Requires additional skills or post-graduation for high-paying roles.

### 5. Possible Compromises
- **Dual Track**: The student can complete an ITI Electrician course for immediate skill-building and employment, while simultaneously pursuing a B.Com through distance education (e.g., IGNOU).
- **Specialized Commerce**: The student pursues B.Com but specializes in areas that have practical, immediate application, paired with technical certifications.

### 6. Recommended Next Steps
We recommend the **Dual Track** approach. This honors the student's desire for practical work and the parent's desire for a degree.
    `.trim();

    return NextResponse.json({ counselling: counsellingText });
  } catch (error) {
    console.error("Family Counselling API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
