import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const SearchBar = () => {
  return (
    <div className='relative md:w-[450px] md:flex-none md:mx-0 mx-5 flex-1'>
      <Input className='w-full rounded-full pr-14' />
      <div className='absolute h-full border-l right-14 top-0'>
        <Search
          role='button'
          className='absolute top-2 left-3 hover:text-zinc-500'
        />
      </div>
    </div>
  )
}

export default SearchBar
