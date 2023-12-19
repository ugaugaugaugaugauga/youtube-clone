'use client'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('')
  const router = useRouter()

  const onSubmit = (e: any) => {
    e.preventDefault()
    router.push(`/search/${searchInput}`)
  }

  return (
    <form
      onSubmit={onSubmit}
      className='relative md:w-[450px] md:flex-none md:mx-0 mx-5 flex-1'
    >
      <Input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className='w-full rounded-full pr-14'
      />
      <button type='submit' className='absolute h-full border-l right-14 top-0'>
        <Search
          role='button'
          className='absolute top-2 left-3 hover:text-zinc-500'
        />
      </button>
    </form>
  )
}

export default SearchBar
