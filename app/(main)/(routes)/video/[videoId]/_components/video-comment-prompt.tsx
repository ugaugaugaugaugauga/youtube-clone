'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

const FormSchema = z.object({
  bio: z
    .string()
    .min(1, {
      message: '댓글을 입력해주세요.',
    })
    .max(160, {
      message: '최대 댓글 입력은 160자 입니다.',
    }),
})

const VideoCommentPrompt = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('dasdas')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='relative w-full space-y-6'
      >
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>댓글</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='댓글을 입력하세요.'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='absolute right-3 top-10'>
          입력
        </Button>
      </form>
    </Form>
  )
}

export default VideoCommentPrompt
