import bcrypt from 'bcrypt'
import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()
  const { name, email, password, confirmPassword } = body

  if (!name) {
    return new NextResponse('Please enter your name', { status: 400 })
  }

  if (!email || !email.endsWith("@u.nus.edu")) {
    return new NextResponse('Please enter a valid NUS email', { status: 400 })
  }

  if (!password) {
    return new NextResponse('Please enter a password', { status: 400 })  
  }

  if (!confirmPassword) {
    return new NextResponse('Please reconfirm your password', { status: 400 })  
  }

  if (password != confirmPassword) {
    return new NextResponse('Passwords do not match', { status: 400 })
  }

  const exist = await prisma.resident.findUnique({
    where: {
      email
    }
  })

  if (exist) {
    return new NextResponse('This email is already associated with an account', { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const resident = await prisma.resident.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  return NextResponse.json(resident)
}