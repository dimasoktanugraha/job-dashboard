import prisma from "../../../../../lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request){
    const data = await request.json()

    const profile = await prisma.companyOverview.findFirst({
        where: {
            companyId: data.companyId
        }
    })

    const result = await prisma.companyOverview.upsert({
        where: {
            companyId: data.companyId,
            id: profile?.id || ""
        },
        create: data,
        update: data
    })

    return NextResponse.json(result)
}