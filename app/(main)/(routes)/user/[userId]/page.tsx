import getCurrentUser from '@/actions/get-current-user'
import db from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import ChannelHeader from './_components/channel-header'
import ChannelBody from './_components/channel-body'

interface UserPageProps {
  userId: string
}

const UserPage = async ({ params }: { params: UserPageProps }) => {
  const currentUser = await getCurrentUser()
  const user = await db.user.findUnique({
    where: {
      id: params.userId,
    },
  })
  if (!user) redirect('/')

  const videos = await db.video.findMany({
    take: 10,
    where: {
      userId: user.id,
    },
    orderBy: {
      createAt: 'desc',
    },
  })

  const isCurrentUser = currentUser?.id === user?.id

  return (
    <div className='w-full'>
      <ChannelHeader user={user} isCurrentUser={isCurrentUser} />
      <ChannelBody
        user={user}
        videos={videos}
        isOwner={currentUser?.id === params.userId}
      />
    </div>
  )
}

export default UserPage
