import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'

export async function POST(request: any) {
  const body = await request.json()
  const { email, slotID } = body

  const slot = await prisma.slot.findUnique({
    where: {
      id: slotID,
    }
  })

  const resident = await prisma.resident.update({
    where: { email: email },
    data: {
      igs: {
        connect: {name: slot?.igName}
      }
    }
  })

  return NextResponse.json(resident)
}