import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'

export async function POST(request: any) {
  const body = await request.json()
  const { id, igName, applicantEmail } = body


  /*
  TO-DO: CODE TO NOTIFY APPLICANT THAT THEIR APPLICATION WAS SUCCESSFUL
  */


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

  return NextResponse.json(deleteIgHeadApplication)
}