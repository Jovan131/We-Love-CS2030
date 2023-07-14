import bcrypt from 'bcrypt'
import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { resolve } from 'path'


export async function POST(input) {
  const body = await input.json()
  const { name, email, password, confirmPassword } = body

  const activeToken = `${randomUUID()}${randomUUID()}`.replace('-', '')

  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API)
  
  const verifyMsg = `Hello ${name}, please activate your account by clicking this link: https://we-love-cs-2030.vercel.app/activate/${activeToken}` //change link to production link (need to check Vercel config I am not sure yet)

  const msg = {
    to: email, // Change to your recipient
    from: 'pesmobileinstall@gmail.com', // Change to your verified sender
    subject: 'Verify your rc4nnect account',
    text: verifyMsg
  }

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

  sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })

  const hashedPassword = await bcrypt.hash(password, 12)

  const resident = await prisma.resident.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword
    }
  })

  const token = await prisma.token.create({
    data: {
      userId: resident.id,
      token: activeToken,
    },
  })

  return NextResponse.json(resident)
}