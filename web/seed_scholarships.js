const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const scholarships = [
    {
      title: "Women in Tech Scholarship",
      eligibility: "Female students pursuing Computer Science or related fields",
      amount: 50000,
      deadline: new Date("2027-01-15"),
      officialSource: "https://example.com/women-in-tech"
    },
    {
      title: "Merit-cum-Means Scholarship",
      eligibility: "Students with 90%+ marks and family income under 4 Lakhs",
      amount: 100000,
      deadline: new Date("2026-12-30"),
      officialSource: "https://example.com/merit-scholarship"
    },
    {
      title: "Future Leaders Grant",
      eligibility: "Undergraduates demonstrating leadership in college",
      amount: 25000,
      deadline: new Date("2026-11-20"),
      officialSource: "https://example.com/future-leaders"
    }
  ];

  for (const s of scholarships) {
    await prisma.scholarship.create({ data: s });
  }
  console.log("Scholarships seeded!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
