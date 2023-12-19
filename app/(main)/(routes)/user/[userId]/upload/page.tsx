import getCurrentUser from '@/actions/get-current-user'
import { redirect } from 'next/navigation'
import UploadZone from './_components/upload-form'

const UploadPage = async ({ params }: { params: { userId: string } }) => {
  const currentUser = await getCurrentUser()
  if (params.userId !== currentUser?.id) redirect('/')

  return (
    <div className='w-full flex justify-center items-center pt-40'>
      <UploadZone userId={params.userId} />
    </div>
  )
}

export default UploadPage
