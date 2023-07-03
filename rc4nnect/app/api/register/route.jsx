import bcrypt from 'bcrypt'
import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()
  const { name, email, password } = body

  if (!name || !email || !password) {
    return new NextResponse('Missing fields', { status: 400 })
  }

  if (!email.endsWith("@u.nus.edu")) {
    return new NextResponse('Please enter a valid NUS email', { status: 400 })
  }

  const exist = await prisma.resident.findUnique({
    where: {
      email
    }
  })

  if (exist) {
    throw new Error('Email already exists')
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