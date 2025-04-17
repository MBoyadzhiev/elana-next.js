import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClientSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createClientSchema.safeParse(body);
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
