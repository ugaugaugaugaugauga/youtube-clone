import getCurrentUser from '@/actions/get-current-user'
import db from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string; videoId: string } },
) {
  try {
    const videoId = params.videoId
    const userId = params.userId

    if (!userId) return new NextResponse('missing user_id', { status: 400 })
    if (!videoId) return new NextResponse('missing video_id', { status: 400 })

    const currentUser = await getCurrentUser()
    if (!currentUser) return new NextResponse('UnAuthorized', { status: 401 })

    if (userId !== currentUser.id)
      return new NextResponse('your not owner', { status: 400 })

    const deleteVideo = await db.video.delete({
      where: {
        id: videoId,
      },
    })

    return NextResponse.json(deleteVideo)
  } catch (error) {
    return new NextResponse('[COMMENT]', { status: 500 })
  }
}
