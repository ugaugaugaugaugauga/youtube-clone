import Avatar from '@/components/avatar'
import db from '@/lib/prismadb'

interface VideoCommentProps {
  userId: string
  comment: string
  createdAt: string
}

const VideoComment = async ({
  userId,
  comment,
  createdAt,
}: VideoCommentProps) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  })
  return (
    <div className='flex py-3'>
      <Avatar src={user?.image} />
      <div className='flex flex-col pl-3 '>
        <div className='flex items-center'>
          <p className='text-sm'>{user?.name}</p>
          <p className='text-xs text-muted-foreground pl-1'>{createdAt}</p>
        </div>
        <div className='text-sm'>{comment}</div>
      </div>
    </div>
  )
}

export default VideoComment
