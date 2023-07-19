
import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'



export async function POST(input: any) {
  const body = await input.json()
  const { iG, title, content } = body

  
  if (!title) {
    return new NextResponse('Please enter a title', { status: 400 })
  }

  if (!content) {
    return new NextResponse('Please enter the announcement content', { status: 400 })
  }

  const announcement = await prisma.announcement.create({
    data: {
        title: title,
        content: content,
        ig: iG,
    }
  })

  return NextResponse.json(announcement)
}