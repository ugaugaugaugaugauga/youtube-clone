'use client'

import Avatar from '@/components/avatar'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface VideoInfoProps {
  userId: string
  videoId: string
  img: string
  name: string
  subscribeCount: number
  isOwner: boolean
}

const VideoInfo = ({
  userId,
  videoId,
  img,
  name,
  subscribeCount,
  isOwner,
}: VideoInfoProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onDelete = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/user/${userId}/video/${videoId}`)
      toast.success('비디오 삭제 성공')
      router.push('/')
      router.refresh()
    } catch (error) {
      toast.error('비디오 삭제 실패')
    } finally {
      setIsLoading(false)
    }
  }

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
      <div className='pl-5'>{!isOwner && <Button>구독</Button>}</div>
      {isOwner && (
        <Button
          onClick={onDelete}
          disabled={isLoading}
          className='ml-auto'
          variant={'destructive'}
        >
          삭제하기
        </Button>
      )}
    </div>
  )
}

export default VideoInfo
