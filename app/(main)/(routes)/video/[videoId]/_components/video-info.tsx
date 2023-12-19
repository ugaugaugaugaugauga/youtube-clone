'use client'

import Avatar from '@/components/avatar'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface VideoInfoProps {
  userId: string
  img: string
  name: string
  subscribeCount: number
  isOwner: boolean
}

const VideoInfo = ({
  userId,
  img,
  name,
  subscribeCount,
  isOwner,
}: VideoInfoProps) => {
  const router = useRouter()

  return (
    <div className='flex items-start gap-3'>
      <button onClick={() => router.push(`/user/${userId}`)}>
        <Avatar src={img} />
      </button>
      <div className='flex flex-col'>
        <p className='font-semibold'>{name}</p>
        <p className='text-muted-foreground text-xs'>
          구독자 {subscribeCount} 명
        </p>
      </div>
      <div className='pl-5'>{isOwner && <Button>구독</Button>}</div>
    </div>
  )
}

export default VideoInfo
