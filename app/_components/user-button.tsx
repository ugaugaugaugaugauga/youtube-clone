'use client'

import Avatar from '@/components/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLoginModal } from '@/hooks/use-login-modal'
import { User } from '@prisma/client'
import { LogOut, Tv } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface UserButtonProps {
  currentUser: User | null
}

const UserButton = ({ currentUser }: UserButtonProps) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  const onClick = () => {
    if (currentUser) router.push(`/user/${currentUser.id}`)
    else loginModal.onOpen()
  }
  const MenuItems = [
    {
      icon: Tv,
      label: '내 채널',
      onClick: onClick,
    },
    {
      icon: LogOut,
      label: '로그아웃',
      onClick: () => signOut(),
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none md:pr-5'>
        <Avatar src={currentUser?.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[300px]'>
        {!currentUser ? (
          <>
            <DropdownMenuItem onClick={() => loginModal.onOpen()}>
              로그인
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel className='flex items-center gap-4'>
              <Avatar src={currentUser?.image} />
              <span className='line-clamp-1'>{currentUser.name}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {MenuItems.map((item) => {
              const Icon = item.icon
              return (
                <DropdownMenuItem
                  key={item.label}
                  onClick={item.onClick}
                  className='flex items-center gap-5 p-3'
                >
                  <Icon className='text-zinc-500' />
                  {item.label}
                </DropdownMenuItem>
              )
            })}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
