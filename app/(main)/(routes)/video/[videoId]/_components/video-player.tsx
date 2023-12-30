interface VideoPlayerProps {
  src: string
}

const VideoPlayer = ({ src }: VideoPlayerProps) => {
  return (
    <div className='bg-zinc-900 flex flex-col'>
      <video
        src={src}
        className='aspect-video mx-auto bg-zinc-600 md:w-2/3 w-full'
        preload='auto'
        controls
      />
    </div>
  )
}

export default VideoPlayer
