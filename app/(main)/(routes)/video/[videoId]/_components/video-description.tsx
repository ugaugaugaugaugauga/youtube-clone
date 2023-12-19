interface VideoDescriptionProps {
  viewCount: number
  createdAt: string
  description: string
}

const VideoDescription = ({
  viewCount,
  createdAt,
  description,
}: VideoDescriptionProps) => {
  return (
    <div className='w-full flex flex-col p-3 bg-zinc-100 rounded-lg'>
      <div className='flex text-sm'>
        <p className=''>조회수 {viewCount} 회</p>
        <p className='pl-5'>{createdAt}</p>
      </div>
      <span>{description}</span>
    </div>
  )
}

export default VideoDescription
