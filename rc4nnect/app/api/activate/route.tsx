import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'

export async function POST(input: any) {
    const body = await input.json();
    const { token } = body;
  
  const user = await prisma.resident.findFirst({
    where: {
      Token: {
        some: {
          AND: [
            {
              activatedAt: null,
            },
            {
              createdAt: {
                gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
              },
            },
            {
              token,
            },
          ],
        },
      },
    },
  })

  if (!user) {
    throw new Error('Token is invalid or expired')
  }

  const createUser = await prisma.resident.update({
    where: {
      id: user.id,
    },
    data: {
      active: true,
    },
  })

  await prisma.token.update({
    where: {
      token,
    },
    data: {
      activatedAt: new Date(),
    },
  })

  return NextResponse.json(createUser)

}