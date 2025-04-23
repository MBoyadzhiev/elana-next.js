import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const logId = parseInt(params.id);
  if (isNaN(logId)) {
    return new Response("Invalid log ID", { status: 400 });
  }

  await prisma.clientLog.delete({
    where: { id: logId },
  });

  return NextResponse.json({ success: true });
}
