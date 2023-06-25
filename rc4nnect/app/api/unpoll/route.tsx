import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'

export async function POST(request: any) {
  const body = await request.json()
  const { email, slotID } = body

  const resident = await prisma.resident.update({
    where: { email: email },
    data: {
      slots: {
        disconnect: [{id: slotID}]
      }
    }
  })

  return NextResponse.json(resident)
}