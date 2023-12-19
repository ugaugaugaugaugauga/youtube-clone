import getCurrentUser from '@/actions/get-current-user'
import db from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return new NextResponse('Unauthorized', { status: 401 })

    const values = await req.json()

    if (currentUser.id !== values.userId)
      return new NextResponse('Not Owner', { status: 400 })

    const video = await db.video.create({
      data: {
        ...values,
      },
    })

    return NextResponse.json(video)
  } catch (error) {
    console.log('[COURSE_ID]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
