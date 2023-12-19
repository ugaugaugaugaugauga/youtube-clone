'use client'
import Avatar from '@/components/avatar'
import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'

interface ChannelHeaderProps {
  user: User
  isCurrentUser: boolean
}

const ChannelHeader = ({ user, isCurrentUser }: ChannelHeaderProps) => {
  const router = useRouter()
  const params = useParams()

  const onClick = () => {
    router.push(`/user/${params?.userId}/upload`)
  }
  return (
    <>
      <div className='pt-10 md:pl-20 pl-3 flex items-start'>
        <Avatar src={user.image} size={200} />
        <div className='flex flex-col pl-8'>
          <span className='font-bold text-4xl'>{user.name}</span>
          <span className='text-muted-foreground pt-5'>@{user.id}</span>
          {isCurrentUser && (
            <Button
              onClick={onClick}
              className='mt-10 bg-sky-500 hover:bg-sky-300'
            >
              <p>동영상 업로드하기</p>
            </Button>
          )}
        </div>
      </div>
      <hr className='mt-4' />
    </>
  )
}

export default ChannelHeader
