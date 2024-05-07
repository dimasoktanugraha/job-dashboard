import prisma from "../../../../../lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
	const data = await request.json();

    const profile = await prisma.companySocialMedia.findFirst({
        where: {
            companyId: data.companyId
        }
    })

    console.log(profile)

    const result = await prisma.companySocialMedia.upsert({
        where: {
            companyId: data.companyId,
            id: profile?.id || ''
        },
        update: data,
        create: data
    })
    console.log(result)

    return NextResponse.json(result)
}
