import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Logo from './logo'

const MenuButton = () => {
  return (
    <Sheet>
      <SheetTrigger className='hover:bg-zinc-200 rounded-full p-1'>
        <Menu />
      </SheetTrigger>
      <SheetContent side={'left'}>
        <Logo />
      </SheetContent>
    </Sheet>
  )
}

export default MenuButton
