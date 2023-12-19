'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter()
  return (
    <div
      onClick={() => {
        router.push('/')
      }}
      className='relative h-20 w-32 md:block hidden cursor-pointer hover:opacity-70'
    >
      <Image src={'/logo.svg'} alt='logo' fill />
    </div>
  )
}

export default Logo
