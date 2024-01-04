import SearchBar from './searchbar'
import Logo from './logo'
import UserButton from './user-button'
import MenuButton from './menu-button'
import getCurrentUser from '@/actions/get-current-user'

const Navbar = async () => {
  const currentUser = await getCurrentUser()

  return (
    <>
      <nav className='fixed z-50 w-full bg-zinc-50 h-[50px] flex items-center justify-between px-5'>
        <div className='flex items-center gap-5'>
          <MenuButton />
          <div className='md:block hidden'>
            <Logo />
          </div>
        </div>
        <SearchBar />
        <UserButton currentUser={currentUser} />
      </nav>
      <div className='pt-[50px]'></div>
    </>
  )
}

export default Navbar
