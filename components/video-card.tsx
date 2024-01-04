'use client'
import Avatar from './avatar'
import { Card, CardContent, CardFooter } from './ui/card'
import { convertToKoreanDate } from '@/lib/convert-to-korea-time'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

interface VideoCardProps {
  thumbnailUrl: string
  title: string
  videoId: string
  createdDate: string
  user: User
}

const VideoCard = ({
  thumbnailUrl,
  title,
  videoId,
  createdDate,
  user,
}: VideoCardProps) => {
  const router = useRouter()

  const onClick = () => {
    router.push(`/video/${videoId}`)
  }

  const videoRef = useRef<HTMLVideoElement | null>(null)

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <Card className='border-none shadow-none'>
      <CardContent className='relative aspect-video clear-none object-fill sm:px-4 p-0'>
        <video
          onMouseEnter={playVideo}
          onMouseLeave={pauseVideo}
          ref={videoRef}
          onClick={onClick}
          src={thumbnailUrl}
          className='object-cover sm:rounded-xl cursor-pointer sm:hover:scale-105 transition-all'
          muted
        />
      </CardContent>

      <CardFooter className='items-start sm:p-4 p-0 sm:py-0 py-2'>
        <button
          onClick={() => {
            router.push(`/user/${user.id}`)
          }}
        >
          <Avatar src={user.image} />
        </button>
        <button onClick={onClick} className='flex flex-col'>
          <div className='ml-2 line-clamp-2 cursor-pointer'>{title}</div>
          <div className='flex text-muted-foreground text-sm'>
            <p className='pl-2'>{user?.name}</p>
            <span className='pl-2'>{convertToKoreanDate(createdDate)}</span>
          </div>
        </button>
      </CardFooter>
    </Card>
  )
}

export default VideoCard
