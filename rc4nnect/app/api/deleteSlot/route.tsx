import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'

export async function POST(request: any) {
  const body = await request.json()
  const { slotId } = body

  const slot = await prisma.slot.delete({
    where: {
      id: slotId
    }
  })

  return NextResponse.json(slot)
}