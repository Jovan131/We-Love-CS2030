import bcrypt from 'bcrypt'
import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { resolve } from 'path'


export async function POST(input: any) {
  const body = await input.json()
  const { email, password, confirmPassword } = body

 if (!password) {
    return new NextResponse('Please enter a new password', { status: 400 })  
  }

  if (!confirmPassword) {
    return new NextResponse('Please reconfirm your password', { status: 400 })  
  }

  if (password != confirmPassword) {
    return new NextResponse('New passwords do not match', { status: 400 })
  }

  const hashedNewPassword = await bcrypt.hash(password, 12)

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