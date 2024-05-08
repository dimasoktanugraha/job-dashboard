import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.categoryJob.findMany();

  return NextResponse.json(categories);
}
