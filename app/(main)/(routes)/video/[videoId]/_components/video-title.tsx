interface VideoTitleProps {
  title: string
}

const VideoTitle = ({ title }: VideoTitleProps) => {
  return <div className='text-2xl font-bold'>{title}</div>
}

export default VideoTitle
