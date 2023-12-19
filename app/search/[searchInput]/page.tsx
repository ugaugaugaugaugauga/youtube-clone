import db from '@/lib/prismadb'
import SearchResultCard from './_components/search-result-card'
import { convertToKoreanDate } from '@/lib/convert-to-korea-time'

const SearchPage = async ({ params }: { params: { searchInput: string } }) => {
  const searchInput = decodeURIComponent(params.searchInput)
  const videosContainingSearchInputs = await db.video.findMany({
    take: 10,
    where: {
      OR: [
        {
          title: {
            contains: searchInput,
          },
        },
        {
          description: {
            contains: searchInput,
          },
        },
      ],
    },
  })

  return (
    <div>
      {videosContainingSearchInputs.map((videosContainingSearchInput) => (
        <SearchResultCard
          key={videosContainingSearchInput.id}
          url={videosContainingSearchInput.video}
          title={videosContainingSearchInput.title}
          viewCount={videosContainingSearchInput.viewCount}
          createdAt={convertToKoreanDate(
            videosContainingSearchInput.createAt.toISOString(),
          )}
          userId={videosContainingSearchInput.userId}
          videoId={videosContainingSearchInput.id}
          description={videosContainingSearchInput.description}
        />
      ))}
    </div>
  )
}

export default SearchPage
