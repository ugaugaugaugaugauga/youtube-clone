import Image from 'next/image'

interface AvatarProps {
  src?: string | null
  size?: number
}

const Avatar = ({ src, size = 40 }: AvatarProps) => {
  return (
    <Image
      src={src ? src : '/placeholder.jpg'}
      alt='avatar'
      width={size}
      height={size}
      className='rounded-full'
    />
  )
}

export default Avatar
