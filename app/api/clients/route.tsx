import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { clientSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = clientSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newClient = await prisma.client.create({
    data: {
      first_name: validation.data.first_name,
      last_name: validation.data.last_name,
      email: validation.data.email,
    },
  });
  return NextResponse.json(newClient, { status: 201 });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "10");
  const skip = (page - 1) * size;

  const [clients, total] = await Promise.all([
    prisma.client.findMany({
      skip,
      take: size,
      orderBy: { date_joined: "desc" },
    }),
    prisma.client.count(),
  ]);

  return NextResponse.json({ clients, total });
}
