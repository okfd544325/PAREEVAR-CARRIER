import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import CareerDetailsClient from "./CareerDetailsClient";

const prisma = new PrismaClient();

export default async function CareerDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const career = await prisma.career.findUnique({
    where: { id: resolvedParams.id },
    include: {
      courses: {
        include: { institute: true }
      }
    }
  });

  if (!career) {
    notFound();
  }

  return <CareerDetailsClient career={career} />;
}
