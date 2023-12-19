import VideoCard from '@/components/video-card'
import db from '@/lib/prismadb'

const MainPage = async () => {
  const videos = await db.video.findMany({
    take: 10,
    include: {
      user: true,
    },
  })

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-10'>
      {videos.map((video) => {
        return (
          <VideoCard
            key={video.id}
            thumbnailUrl={video.video}
            user={video.user}
            videoId={video.id}
            title={video.title}
            createdDate={video.createAt.toISOString()}
          />
        )
      })}
    </div>
  )
}

export default MainPage
