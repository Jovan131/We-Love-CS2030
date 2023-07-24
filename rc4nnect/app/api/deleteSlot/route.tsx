import { prisma } from '@/app/db'
import moment, { Moment } from 'moment'
import 'moment/locale/en-sg'
import { NextResponse } from 'next/server'

export async function POST(request: any) {
  const body = await request.json()
  const { slotId } = body

  const info = await prisma.slot.findFirst({
    where: {
      id: slotId
    }
  })
  
  const startDateTime = info?.startDateTime
  const igSelected = info?.igName!

  const slot = await prisma.slot.delete({
    where: {
      id: slotId
    }
  })

  const title = `Session on ${moment(startDateTime).format("dddd, MMMM Do")}, ${moment(startDateTime).format("hh:mm A")} has been cancelled`

  const content = `Our IG Exco will update you on future sessions soon!`

  const announcement = await prisma.announcement.create({
    data: {
      title: title,
      content: content,
      igName: igSelected,
    }
  })

  return NextResponse.json(slot)
}