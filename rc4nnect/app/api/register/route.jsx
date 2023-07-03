import bcrypt from 'bcrypt'
import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()
  const { name, email, password, confirmPassword } = body

  if (!name || !email || !password || !confirmPassword) {
    return new NextResponse('Missing fields', { status: 400 })
  }

  if (!email.endsWith("@u.nus.edu")) {
    return new NextResponse('Please enter a valid NUS email', { status: 400 })
  }

  if (password != confirmPassword) {
    return new NextResponse('Passwords don\'t match', { status: 400 })
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