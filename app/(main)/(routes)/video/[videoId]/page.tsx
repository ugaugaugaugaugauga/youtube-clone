import db from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import VideoPlayer from './_components/video-player'
import VideoTitle from './_components/video-title'
import VideoInfo from './_components/video-info'
import VideoDescription from './_components/video-description'
import getCurrentUser from '@/actions/get-current-user'
import { convertToKoreanDate } from '@/lib/convert-to-korea-time'
import VideoCommentPrompt from './_components/video-comment-prompt'
import VideoComment from './_components/video-comment'

const VideoIdPage = async ({ params }: { params: { videoId: string } }) => {
  const currentUser = await getCurrentUser()

  const video = await db.video.findUnique({
    where: {
      id: params.videoId,
    },
    include: {
      comments: {
        take: 20,
        orderBy: {
          createAt: 'desc',
        },
      },
    },
  })

  if (!video) redirect('/')

  await db.video.update({
    where: {
      id: params.videoId,
    },
    data: {
      viewCount: {
        increment: 1,
      },
    },
  })

  const videoOwner = await db.user.findUnique({
    where: {
      id: video.userId,
    },
    include: {
      _count: {
        select: {
          subscribes: true,
        },
      },
    },
  })

  if (!videoOwner) redirect('/')

  const isOwner = await db.video.findUnique({
    where: {
      id: video.id,
    },
    select: {
      userId: true,
    },
  })

  const isCurrentUserOwner = isOwner?.userId === currentUser?.id
  return (
    <>
      <VideoPlayer src={video.video} />
      <div className='px-4 2xl:w-[1600px] w-auto mx-auto flex flex-col gap-3 pt-3'>
        <VideoTitle title={video.title} />
        <VideoInfo
          img={videoOwner.image!}
          name={videoOwner.name!}
          subscribeCount={videoOwner._count.subscribes}
          isOwner={!isCurrentUserOwner}
        />
        <VideoDescription
          viewCount={video.viewCount}
          createdAt={convertToKoreanDate(video.createAt.toISOString())}
          description={video.description}
        />
        <VideoCommentPrompt videoId={video.id} />
        {video.comments.map((comment) => (
          <VideoComment
            key={comment.id}
            userId={comment.userId}
            comment={comment.comment}
            createdAt={convertToKoreanDate(comment.createAt.toISOString())}
          />
        ))}
      </div>
    </>
  )
}

export default VideoIdPage
