import bcrypt, { compare } from 'bcrypt'
import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'

export async function POST(request: any) {
  const body = await request.json()
  const { oldPassword, confirmOldPassword, newPassword, confirmNewPassword, email } = body

  if (!oldPassword || !confirmOldPassword || !newPassword || !confirmNewPassword) {
    return new NextResponse('Missing fields', { status: 400 })
  }

  if (oldPassword != confirmOldPassword) {
    return new NextResponse('Old passwords do not match', { status: 400 })
  }

  if (newPassword != confirmNewPassword) {
    return new NextResponse('New passwords do not match', { status: 400 })
  }

  if (oldPassword === newPassword) {
    return new NextResponse('New password must be different from old password', { status: 400 })
  }

  const user = await prisma.resident.findUnique({
    where: {
      email
    }
  })

  const oldPasswordCorrect = await compare(
    oldPassword,
    user?.password!
  )

  if (!oldPasswordCorrect) {
    return new NextResponse('Old password keyed in was incorrect', { status: 400 })
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 12)

  const updateUser = await prisma.resident.update({
    where: {
      email
    },
    data: {
      password: hashedNewPassword,
    },
  })

  return NextResponse.json(updateUser)
}