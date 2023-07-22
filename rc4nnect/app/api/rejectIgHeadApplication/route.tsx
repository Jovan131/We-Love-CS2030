import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'

export async function POST(request: any) {
  const body = await request.json()
  const { id, igName, applicantEmail } = body

  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API)
  
  const acceptMsg = `Hello ${applicantEmail}, your application for the IG Head position of ${igName} has been rejected. If you think this was a mistake, please manually contact the CSC Head.`

  const msg = {
    to: applicantEmail, // Change to your recipient
    from: 'pesmobileinstall@gmail.com', // Change to your verified sender
    subject: 'IG Head Application Rejected',
    text: acceptMsg
  }

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