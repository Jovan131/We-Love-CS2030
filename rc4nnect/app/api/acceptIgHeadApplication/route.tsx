import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'

export async function POST(request: any) {
  const body = await request.json()
  const { id, igName, applicantEmail } = body


  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API)
  
  const acceptMsg = `Hello ${applicantEmail}, your application for the IG Head position of ${igName} is successful! You can now access IG Head features of rc4nnect.`

  const msg = {
    to: applicantEmail, // Change to your recipient
    from: 'pesmobileinstall@gmail.com', // Change to your verified sender
    subject: 'IG Head Application Successful',
    text: acceptMsg
  }


  const igHeadAlreadyExists = await prisma.iG.findFirst({
    where: {
      name: igName,
      igHead: { isNot: null }
    }
  })

  if (igHeadAlreadyExists) {
    return new NextResponse(`Request failed, as ${igName} already has an existing IG head.`, { status: 400 })
  }


  const updateIG = await prisma.iG.update({
    where: {
      name: igName
    },
    data: {
      igHead: {
        connect: { email: applicantEmail }
      }
    }
  })

  const updateUser = await prisma.resident.update({
    where: {
      email: applicantEmail
    },
    data: {
      role: "IG_HEAD"
    }
  })

  const deleteIgHeadApplication = await prisma.igHeadApplication.delete({
    where: {
      id: id
    }
  })

  sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error: any) => {
    console.error(error)
  })

  return NextResponse.json(deleteIgHeadApplication)
}