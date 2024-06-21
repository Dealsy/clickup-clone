'use client'

import { useState } from 'react'
import { Ellipsis, Pencil, Plus } from 'lucide-react'
import Pill from '@/components/pill'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useQueryClient } from '@tanstack/react-query'

export default function BoardGroups() {
  const { data, isLoading, isError, isFetching } = api.board.getBoardGroups.useQuery()
  const queryClient = useQueryClient()

  const [editGroupId, setEditGroupId] = useState<number | null>(null)
  const [newGroupName, setNewGroupName] = useState('')

  const createTask = api.task.create.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries()
    },
  })

  const rename = api.board.update.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries()
      setEditGroupId(null)
    },
  })

  const handleRenameClick = (id: number, currentName: string) => {
    setEditGroupId(id)
    setNewGroupName(currentName)
  }

  const handleRenameSubmit = (id: number) => {
    rename.mutate({ id, name: newGroupName })
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <div className="flex flex-row gap-4">
      {isFetching && <div>Loading...</div>}
      {data?.map(board => (
        <div
          key={board.id}
          className={`h-[100px] min-w-[360px] rounded-lg ${board.boardColour} bg-opacity-5 p-1`}>
          <div className="flex flex-row items-center justify-between">
            {editGroupId === board.id ? (
              <input
                value={newGroupName}
                onChange={e => setNewGroupName(e.target.value)}
                onBlur={() => handleRenameSubmit(board.id)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleRenameSubmit(board.id)
                  }
                }}
                className="border-b-2 border-gray-300 bg-transparent focus:outline-none"
              />
            ) : (
              <Pill className={`${board.boardColour} bg-opacity-90`}>{board.statusName}</Pill>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="elispe" size={'sm'}>
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-52">
                <DropdownMenuLabel className="text-xs font-normal text-gray-500">
                  Group options
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleRenameClick(board.id, board.statusName!)}>
                  <Pencil className="mr-2 h-4 items-center text-gray-500" /> <span>Rename</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Future task rendering can be done here */}
          <Button
            className={cn(
              'bg-inherit/20 mt-2 w-full text-left text-base text-gray-500',
              'hover:bg-white/10 active:bg-white/20',
            )}>
            <Plus /> Add task
          </Button>
        </div>
      ))}
    </div>
  )
}
