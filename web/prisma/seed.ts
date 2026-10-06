import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Careers
  const careers = await Promise.all([
    prisma.career.create({
      data: {
        title: "Electrician",
        description: "Install, maintain, and repair electrical power, communications, lighting, and control systems.",
        reqEducation: "ITI or Diploma",
        reqSkills: "Wiring,Circuit Troubleshooting,Safety Protocols",
        careerProgression: "Apprentice -> Journeyman -> Master Electrician",
      }
    }),
    prisma.career.create({
      data: {
        title: "CNC Machinist",
        description: "Operate computer-controlled machine tools to produce precision metal parts, instruments, and tools.",
        reqEducation: "ITI or Diploma",
        reqSkills: "G-Code,Precision Measurement,Blueprint Reading",
        careerProgression: "Operator -> Programmer -> Shop Supervisor",
      }
    }),
    prisma.career.create({
      data: {
        title: "Plumber",
        description: "Install and repair pipes and fixtures that carry water, gas, or other fluids in homes and businesses.",
        reqEducation: "ITI",
        reqSkills: "Pipefitting,Welding,Blueprint Reading",
        careerProgression: "Apprentice -> Plumber -> Contractor",
      }
    }),
    prisma.career.create({
      data: {
        title: "HVAC Technician",
        description: "Work on heating, ventilation, cooling, and refrigeration systems that control the temperature and air quality.",
        reqEducation: "ITI or Diploma",
        reqSkills: "Thermodynamics,Electrical Troubleshooting,Refrigerant Handling",
        careerProgression: "Technician -> Lead Technician -> System Designer",
      }
    }),
    prisma.career.create({
      data: {
        title: "Data Entry Operator",
        description: "Input data from various sources into the company computer system for processing and management.",
        reqEducation: "12th Standard",
        reqSkills: "Typing,Basic Computer Skills,Attention to Detail",
        careerProgression: "Operator -> Data Analyst",
      }
    }),
    prisma.career.create({
      data: {
        title: "Web Developer",
        description: "Design and build websites, taking care of both the visual look and the backend systems.",
        reqEducation: "Diploma or Degree",
        reqSkills: "HTML,CSS,JavaScript,React",
        careerProgression: "Junior Dev -> Senior Dev -> Tech Lead",
      }
    }),
    prisma.career.create({
      data: {
        title: "Graphic Designer",
        description: "Create visual concepts to communicate ideas that inspire, inform, or captivate consumers.",
        reqEducation: "Diploma",
        reqSkills: "Adobe Creative Suite,Typography,Layout Design",
        careerProgression: "Junior Designer -> Art Director",
      }
    }),
    prisma.career.create({
      data: {
        title: "Automobile Mechanic",
        description: "Inspect, maintain, and repair cars and light trucks.",
        reqEducation: "ITI",
        reqSkills: "Engine Diagnostics,Brake Systems,Electrical Systems",
        careerProgression: "Mechanic -> Service Manager",
      }
    }),
    prisma.career.create({
      data: {
        title: "Welder",
        description: "Use hand-welding, flame-cutting, hand soldering, or brazing equipment to weld or join metal components.",
        reqEducation: "ITI",
        reqSkills: "MIG/TIG Welding,Blueprint Reading",
        careerProgression: "Welder -> Inspector",
      }
    }),
    prisma.career.create({
      data: {
        title: "Dental Hygienist",
        description: "Examine patients for signs of oral diseases, such as gingivitis, and provide preventive care.",
        reqEducation: "Diploma in Dental Hygiene",
        reqSkills: "Patient Care,Teeth Cleaning,X-Ray Operation",
        careerProgression: "Hygienist -> Practice Manager",
      }
    })
  ])

  console.log("Seeded 10 careers.")

  // Seed Institutes & Courses
  const inst1 = await prisma.institute.create({
    data: {
      name: "National Vocational Training Institute",
      location: "Mumbai",
      feesAvg: 25000,
    }
  })

  await prisma.course.create({
    data: {
      name: "ITI Certificate in Electrician",
      duration: "2 Years",
      fees: 15000,
      eligibility: "10th Standard",
      careerId: careers[0].id,
      instituteId: inst1.id
    }
  })
  
  await prisma.course.create({
    data: {
      name: "Diploma in Web Development",
      duration: "1 Year",
      fees: 45000,
      eligibility: "12th Standard",
      careerId: careers[5].id,
      instituteId: inst1.id
    }
  })

  console.log("Seeded courses and institutes.")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
