import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'

export async function POST(request: any) {
  const body = await request.json()
  const { email, slotInfoID } = body

  const slot = await prisma.slot.findUnique({
    where: {
      id: slotInfoID,
    }
  })

  const subscribed = await prisma.resident.findFirst({
    where: {
      AND: [
        {
          email: {
            equals: email
          },
        },
        {
          igs: {
            some: {
              name: slot?.igName
            }
          }
        }
      ]
    }
  })

  return NextResponse.json(subscribed)
}