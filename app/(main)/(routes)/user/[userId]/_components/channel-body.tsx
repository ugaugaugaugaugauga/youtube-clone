'use client'

import { Button } from '@/components/ui/button'
import VideoCard from '@/components/video-card'
import { User, Video } from '@prisma/client'
import { VideoOff } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

interface ChannelBodyProps {
  user: User
  videos: Video[]
  isOwner: boolean
}

const ChannelBody = ({ videos, isOwner, user }: ChannelBodyProps) => {
  const router = useRouter()
  const params = useParams()

  const onClick = () => {
    router.push(`/user/${params?.userId}/upload`)
  }

  if (!videos.length && isOwner) {
    return (
      <div className='flex flex-col items-center pt-40 gap-3'>
        <VideoOff size={64} className='text-muted-foreground' />
        <span>채널에 콘탠츠가 존재하지 않습니다.</span>
        <Button onClick={onClick} className='bg-sky-500 hover:bg-sky-300'>
          <p>동영상 업로드하기</p>
        </Button>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-10'>
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          thumbnailUrl={video.video}
          user={user}
          videoId={video.id}
          title={video.title}
          createdDate={video.createAt.toISOString()}
        />
      ))}
    </div>
  )
}

export default ChannelBody
