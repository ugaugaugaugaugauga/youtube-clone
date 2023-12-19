'use client'
import { FileUpload } from '@/components/file-upload'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import axios from 'axios'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface UploadFormProps {
  userId: string
}

const UploadForm = ({ userId }: UploadFormProps) => {
  const router = useRouter()
  const [video, setVideo] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDesCription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async () => {
    try {
      setIsSubmitting(true)
      await axios.post(`/api/video`, {
        userId: userId,
        video: video,
        title: title,
        description: description,
      })
      toast.success('Chapter updated')
      router.push(`/user/${userId}`)
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex flex-col items-center gap-3'>
      <div className='flex items-center gap-3'>
        제목
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-auto'
          disabled={isSubmitting}
        />
      </div>
      <div className='flex items-center gap-3'>
        설명
        <Input
          value={description}
          onChange={(e) => setDesCription(e.target.value)}
          className='w-auto'
          disabled={isSubmitting}
        />
      </div>
      {!video ? (
        <FileUpload
          endpoint='chapterVideo'
          onChange={(url) => {
            if (url) setVideo(url)
          }}
        />
      ) : (
        <div className='relative'>
          <video className='aspect-video w-[600px]' src={video} controls />
          <Button
            onClick={() => setVideo('')}
            className='absolute top-0 right-0'
            variant={'destructive'}
            disabled={isSubmitting}
          >
            수정하기
          </Button>
        </div>
      )}

      <Button
        onClick={onSubmit}
        className='bg-sky-500 hover:bg-sky-300 w-full md:w-[200px]'
        disabled={isSubmitting || !!video}
      >
        업로드
      </Button>
    </div>
  )
}

export default UploadForm
