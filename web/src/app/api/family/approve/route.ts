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
    const id = formData.get("id") as string;

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.redirect(new URL("/family?error=user_not_found", req.url));

    const familyMember = await prisma.familyMember.findUnique({ where: { id } });
    
    // Ensure the current user is the student that this request belongs to
    if (familyMember?.studentId !== user.id) {
      return NextResponse.redirect(new URL("/family?error=unauthorized", req.url));
    }

    await prisma.familyMember.update({
      where: { id },
      data: { authorized: true }
    });

    return NextResponse.redirect(new URL("/family?success=approved", req.url));
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/family?error=server_error", req.url));
  }
}
