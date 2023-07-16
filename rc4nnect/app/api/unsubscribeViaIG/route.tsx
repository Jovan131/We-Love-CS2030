import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'

export async function POST(request: any) {
  const body = await request.json()
  const { email, igName } = body

  const resident = await prisma.resident.update({
    where: { email: email },
    data: {
      igs: {
        disconnect: {name: igName}
      }
    }
  })

  return NextResponse.json(resident)
}