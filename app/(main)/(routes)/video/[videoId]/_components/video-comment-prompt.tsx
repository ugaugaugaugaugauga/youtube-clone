'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const FormSchema = z.object({
  comment: z
    .string()
    .min(1, {
      message: '댓글을 입력해주세요.',
    })
    .max(160, {
      message: '최대 댓글 입력은 160자 입니다.',
    }),
})

interface VideoCommentPromptProps {
  videoId: string
}

const VideoCommentPrompt = ({ videoId }: VideoCommentPromptProps) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { comment: '' },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsSubmitting(true)
      await axios.post(`/api/video/${videoId}/comment`, data)
      toast.success('댓글 성공')
      form.reset({ comment: '' })
      router.refresh()
    } catch (error) {
      toast.error('댓글 실패')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='relative w-full space-y-6'
      >
        <FormField
          control={form.control}
          name='comment'
          disabled={isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>댓글</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isSubmitting}
                  placeholder='댓글을 입력하세요.'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isSubmitting}
          type='submit'
          className='absolute right-3 top-10'
        >
          입력
        </Button>
      </form>
    </Form>
  )
}

export default VideoCommentPrompt
