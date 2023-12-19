import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const MenuButton = () => {
  return (
    <Sheet>
      <SheetTrigger className='hover:bg-zinc-200 rounded-full p-1'>
        <Menu />
      </SheetTrigger>
      <SheetContent side={'left'}>
        <div>content</div>
      </SheetContent>
    </Sheet>
  )
}

export default MenuButton
