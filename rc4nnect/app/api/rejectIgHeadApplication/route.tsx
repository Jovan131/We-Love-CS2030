import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'

export async function POST(request: any) {
  const body = await request.json()
  const { id, igName, applicantEmail } = body

  /*
  CODE TO NOTIFY APPLICANT THAT THEIR APPLICATION WAS UNSUCCESSFUL
  */

  const deleteIgHeadApplication = await prisma.igHeadApplication.delete({
    where: {
      id: id
    }
  })

  return NextResponse.json(deleteIgHeadApplication)
}