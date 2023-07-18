import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'

export async function POST(request: any) {
  const body = await request.json()
  const { fullName, teleHandle, igAppliedFor, email } = body

  if (!fullName || !teleHandle || !igAppliedFor || !email) {
    return new NextResponse("Please fill in all fields", { status: 400 })
  }

  if (!teleHandle.startsWith('@')) {
    return new NextResponse("Tele handle must start with '@'", { status: 400 })
  }

  const exists = await prisma.igHeadApplication.findFirst({
    where: {
      applicantEmail: email,
      igName: igAppliedFor
    }
  })

  if (exists) {
    return new NextResponse(`You already have an existing application for ${igAppliedFor} IG head`, { status: 400 })
  }

  const igHeadApplication = await prisma.igHeadApplication.create({
    data: {
      applicantFullName: fullName,
      applicantTeleHandle: teleHandle,
      igName: igAppliedFor,
      applicantEmail: email,
    }
  })

  return NextResponse.json(igHeadApplication)
}