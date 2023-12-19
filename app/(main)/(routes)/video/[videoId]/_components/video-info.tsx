'use client'

import Avatar from '@/components/avatar'
import { Button } from '@/components/ui/button'

interface VideoInfoProps {
  img: string
  name: string
  subscribeCount: number
  isOwner: boolean
}

const VideoInfo = ({ img, name, subscribeCount, isOwner }: VideoInfoProps) => {
  return (
    <div className='flex items-start gap-3'>
      <Avatar src={img} />
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
