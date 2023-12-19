'use client'
import Avatar from './avatar'
import { Card, CardContent, CardFooter } from './ui/card'
import { convertToKoreanDate } from '@/lib/convert-to-korea-time'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'

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

  return (
    <Card className='border-none shadow-none'>
      <CardContent className='relative aspect-video clear-none object-fill'>
        <video
          onClick={onClick}
          src={thumbnailUrl}
          className='object-cover rounded-xl cursor-pointer'
        />
      </CardContent>

      <CardFooter className='items-start'>
        <Avatar src={user.image} />
        <div className='flex flex-col'>
          <div className='ml-2 line-clamp-2 cursor-pointer'>{title}</div>
          <div className='flex text-muted-foreground text-sm'>
            <p className='pl-2'>{user?.name}</p>
            <span className='pl-2'>{convertToKoreanDate(createdDate)}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default VideoCard
