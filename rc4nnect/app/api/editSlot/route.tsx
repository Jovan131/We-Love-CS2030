import { prisma } from '@/app/db'
import moment, { Moment } from 'moment'
import { NextResponse } from 'next/server'

type inputObj = {
  id: string,
  startDateTime: string | null,
  endDateTime: string | null,
  venue: string,
  description: string,
  capacity: string,
}

export async function POST(input: any) {
  const body:inputObj = await input.json()
  console.log(body)
  const { id, startDateTime, endDateTime, venue, description, capacity } = body

  if (!startDateTime || !endDateTime || venue === "") {
    return new NextResponse('Missing compulsory fields', { status: 400 })
  }

  if (!Date.parse(startDateTime) || !Date.parse(endDateTime)) {
    return new NextResponse('Invalid date format', { status: 400 })
  }

  if (!moment(endDateTime).isAfter(moment(startDateTime))) {
    return new NextResponse('End date/time must be after start date/time', { status: 400 })  
  }

  if (!moment(startDateTime).isSame(moment(endDateTime), 'day')) {
    return new NextResponse('Slots must start/end on the same day.', { status: 400 })  
  }

  if (moment(endDateTime).diff(moment(startDateTime), 'hours') > 3) {
    return new NextResponse('Max slot duration is 3 hours', { status: 400 })
  }

  if (moment(startDateTime).hour() < 14) {
    return new NextResponse('Slot timing must be between 1400H-2345H.', { status: 400 })
  }

  function countWords(str: string) {
    const arr = str.split(' ');
  
    return arr.filter(word => word !== '').length;
  }
  
  if (countWords(description) > 500) {
    return new NextResponse('Description cannot exceed 500 words', { status: 400 })
  }

  if (Number.isNaN(capacity) || Number(capacity) < 1 || Number(capacity) > 99) {
    return new NextResponse('Capacity must be a number between 1 and 99', { status: 400 })
  }

  const updateSlot = await prisma.slot.update({
    where: {
      id: id,
    },
    data: {
      capacity: Number(capacity),
      venue: venue,
      startDateTime: startDateTime,
      duration: moment(endDateTime).diff(moment(startDateTime), 'hours'),
      description: description,
    },
  })

  return NextResponse.json(updateSlot)
}