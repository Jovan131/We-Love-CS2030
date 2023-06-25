import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'

export async function POST(request: any) {
  const body = await request.json()
  const { email, slotInfoID } = body

  const polled = await prisma.resident.findFirst({
    where: {
      AND: [
        {
          email: {
            equals: email
          },
        },
        {
          slots: {
            some: {
              id: slotInfoID
            }
          }
        }
      ]
    }
  })

  return NextResponse.json(polled)
}