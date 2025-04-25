import authOptions from "@/app/auth/authOptions";
import { createClientSchema } from "@/app/validationSchemas";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Props
{
    params : {id: string}
}

export async function PATCH(reuqest: NextRequest, {params}: Props)
{
    const session = await getServerSession(authOptions)
    if(!session) return NextResponse.json({error: 'Unauthorized'}, {status: 401});

    const body = await reuqest.json();
    const validation = createClientSchema.safeParse(body);

    if(!validation.success) return NextResponse.json(validation.error.errors, {status: 400});

    const clientId = await parseInt(params.id);
    const client  = await prisma.client.findUnique({where:{id:clientId}});
    
    if(!client) return NextResponse.json({error: 'Client not found'}, {status: 404});

    const updatedClient = await prisma.client.update({where:{id:clientId}, data:validation.data});
    return NextResponse.json(updatedClient);
}

export async function DELETE(reuqest: NextRequest, {params}: Props)
{
    const session = await getServerSession(authOptions)
    if(!session) return NextResponse.json({error: 'Unauthorized'}, {status: 401});

    const clientId = await parseInt(params.id);
    const client  = await prisma.client.findUnique({where:{id:clientId}});
    
    if(!client) return NextResponse.json({error: 'Client not found'}, {status: 404});

    await prisma.client.delete({where:{id:clientId}});
    return NextResponse.json({success: true});
}