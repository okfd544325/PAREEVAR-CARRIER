import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const studentEmail = formData.get("email") as string;
    const relation = formData.get("relation") as string;

    if (!studentEmail || !relation) {
      return NextResponse.redirect(new URL("/family?error=missing_fields", req.url));
    }

    const parent = await prisma.user.findUnique({ where: { email: session.user.email } });
    const student = await prisma.user.findUnique({ where: { email: studentEmail } });

    if (!student) {
      return NextResponse.redirect(new URL("/family?error=student_not_found", req.url));
    }

    await prisma.familyMember.create({
      data: {
        userId: parent!.id,
        studentId: student.id,
        relation,
        authorized: false
      }
    });

    return NextResponse.redirect(new URL("/family?success=request_sent", req.url));
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/family?error=server_error", req.url));
  }
}
