'use client'

import { Plus } from 'lucide-react'
import Pill from '@/components/pill'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'

export default function BoardGroups() {
  const { data, isLoading, isError, isFetching } = api.board.getBoardGroups.useQuery()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <>
      {isFetching && <div>Loading...</div>}
      {data?.map(board => (
        <div
          key={board.id}
          className={`w-[360px] rounded-lg ${board.boardColour} bg-opacity-5 p-2`}>
          <Pill className={`${board.boardColour} bg-opacity-90`}>{board.statusName}</Pill>

          <Button
            className={cn(
              'bg-inherit/20 mt-2 w-full text-left text-base text-gray-500',
              'hover:bg-white/10 active:bg-white/20',
            )}>
            <Plus /> Add task
          </Button>
        </div>
      ))}
    </>
  )
}
