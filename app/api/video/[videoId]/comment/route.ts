import getCurrentUser from '@/actions/get-current-user'
import db from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  { params }: { params: { videoId: string } },
) {
  try {
    const values = await req.json()
    const videoId = params.videoId
    if (!videoId) return new NextResponse('missing video_id', { status: 400 })

    const currentUser = await getCurrentUser()
    if (!currentUser) return new NextResponse('UnAuthorized', { status: 401 })

    const comment = await db.comment.create({
      data: {
        userId: currentUser.id,
        videoId,
        ...values,
      },
    })

    return NextResponse.json(comment)
  } catch (error) {
    return new NextResponse('[COMMENT]', { status: 500 })
  }
}
