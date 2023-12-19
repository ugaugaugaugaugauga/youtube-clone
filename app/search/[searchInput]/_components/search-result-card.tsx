import Avatar from '@/components/avatar'
import db from '@/lib/prismadb'
import Link from 'next/link'

interface SearchResultCardProps {
  url: string
  title: string
  viewCount: number
  createdAt: string
  userId: string
  description: string
  videoId: string
}

const SearchResultCard = async ({
  url,
  title,
  viewCount,
  createdAt,
  userId,
  videoId,
  description,
}: SearchResultCardProps) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  })
  return (
    <div className='flex md:flex-row flex-col md:w-[1080px] w-full mx-auto py-3'>
      <Link href={`/video/${videoId}`}>
        <video
          src={url}
          className='aspect-video rounded-lg object-fill md:h-[200px]'
        />
      </Link>

      <div className='flex flex-col pl-3'>
        <div className='text-xl'>{title}</div>
        <div className='flex flex-row text-muted-foreground text-sm'>
          <p>조회수 {viewCount} 회</p>
          <span className='pl-2'>{createdAt}</span>
        </div>
        <div className='flex flex-row items-center my-4'>
          <Avatar src={user?.image} size={30} />
          <div className='pl-2'>{user?.name}</div>
        </div>
        <div>{description}</div>
      </div>
    </div>
  )
}

export default SearchResultCard
