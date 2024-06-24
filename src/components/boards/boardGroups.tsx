'use client'

import { useState, useRef, useEffect } from 'react'
import { Ellipsis, Pencil, Plus, Trash } from 'lucide-react'
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
import { Card } from '@/components/ui/card'
import GroupSkeleton from '../skeletons/groupSkeleton'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { z } from 'zod'
import useServerActions from '@/hooks/useCrudActions'

const taskSchema = z.object({
  name: z.string().min(1, 'Task name is required'),
})

export default function BoardGroups() {
  const { data, isLoading, isError, isFetching } = api.board.getBoardGroups.useQuery()
  const {
    data: tasks,
    isLoading: isTaskLoading,
    isError: isTaskError,
    isFetching: isTaskFetching,
  } = api.task.getTasks.useQuery()

  const {
    rename,
    createTask,
    deleteGroupAndTasks,
    editGroupId,
    setEditGroupId,
    addingTaskId,
    setAddingTaskId,
    taskName,
    setTaskName,
    deleteTask,
    renameTask,
    newTaskName,
    setNewTaskName,
    editTaskId,
    setEditTaskId,
  } = useServerActions()

  const [newGroupName, setNewGroupName] = useState('')
  const [taskErrors, setTaskErrors] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const saveButtonRef = useRef<HTMLButtonElement | null>(null)
  const taskInputWrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (addingTaskId !== null) {
      inputRef.current?.focus()
    }
  }, [addingTaskId])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        taskInputWrapperRef.current &&
        !taskInputWrapperRef.current.contains(event.target as Node)
      ) {
        setAddingTaskId(null)
        setTaskErrors([])
      }
    }

    if (addingTaskId !== null) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addingTaskId])

  const handleRenameClick = (id: number, currentName: string) => {
    setEditGroupId(id)
    setNewGroupName(currentName)
  }

  const handleRenameSubmit = (id: number) => {
    rename.mutate({ id, name: newGroupName })
  }

  const handleTaskRenameSubmit = (taskId: number) => {
    renameTask.mutate({ id: taskId, name: newTaskName })
  }

  const handleTaskSubmit = (groupId: number) => {
    const result = taskSchema.safeParse({ name: taskName })
    if (!result.success) {
      setTaskErrors(result.error.errors.map(error => error.message))
      return
    }

    createTask.mutate({ boardGroupId: groupId, name: taskName })
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.relatedTarget !== saveButtonRef.current) {
      setAddingTaskId(null)
      setTaskErrors([]) // Reset errors when the input field loses focus
    }
  }

  const handleDelete = (groupId: number) => {
    deleteGroupAndTasks.mutate({ id: groupId })
  }
  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId)
  }

  const taskNameError = taskErrors.length > 0 && taskErrors[0]

  if (isLoading) return <GroupSkeleton />
  if (isError) return <div>Error</div>
  if (isTaskLoading) return <div>Loading...</div>
  if (isTaskError) return <div>Error</div>

  return (
    <div className="flex flex-row gap-4">
      {data?.map(board => (
        <section key={board.id}>
          <Card
            className={`min-h-[100px] min-w-[360px] rounded-lg ${board.boardColour} bg-opacity-5 p-1`}>
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
                <div className="flex flex-row items-center gap-2">
                  <Pill className={`${board.boardColour} bg-opacity-90 uppercase`}>
                    {board.statusName}
                  </Pill>
                  <div className="text-xs text-gray-500">
                    {tasks?.filter(task => task.boardGroupId === board.id).length}
                  </div>
                </div>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="elispe" size={'sm'}>
                    <Ellipsis className="text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                  <DropdownMenuLabel className="text-xs font-normal text-gray-500">
                    Group options
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => handleRenameClick(board.id, board.statusName ?? '')}>
                    <Pencil className="mr-2 h-4 items-center text-gray-500" /> <span>Rename</span>
                  </DropdownMenuItem>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div
                        className={cn(
                          'group mt-2 flex cursor-pointer flex-row items-center rounded-sm p-1 pl-2 text-xs',
                          'hover:bg-red-500/40',
                        )}>
                        <Trash className="mr-2 h-4 items-center text-gray-500 group-hover:text-white" />{' '}
                        <span>Delete</span>
                      </div>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Are you sure you want to delete this group?</DialogTitle>
                        <DialogDescription>
                          This will permanently delete the group and all associated tasks.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="destructive" onClick={() => handleDelete(board.id)}>
                          Delete
                        </Button>
                        <DialogClose>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* Added Tasks */}
            <div className="mt-2 flex flex-col gap-2">
              {tasks
                ?.filter(task => task.boardGroupId === board.id)
                .map(task => (
                  <div key={task.id} className="rounded-lg border border-gray-600 p-4 text-white">
                    <div className="flex flex-row justify-between">
                      {editTaskId === task.id ? (
                        <input
                          value={newTaskName}
                          onChange={e => setNewTaskName(e.target.value)}
                          onBlur={() => handleTaskRenameSubmit(task.id)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              handleTaskRenameSubmit(task.id)
                            }
                          }}
                          className="border-b-2 border-gray-300 bg-transparent focus:outline-none"
                        />
                      ) : (
                        <span>{task.taskName}</span>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="elispe" size={'sm'}>
                            <Ellipsis className="text-white" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-52">
                          <DropdownMenuLabel className="text-xs font-normal text-gray-500">
                            Task options
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              setEditTaskId(task.id)
                              setNewTaskName(task.taskName ?? '')
                            }}>
                            <Pencil className="mr-2 h-4 items-center text-gray-500" />{' '}
                            <span>Rename</span>
                          </DropdownMenuItem>
                          <Dialog>
                            <DialogTrigger asChild>
                              <div
                                className={cn(
                                  'group mt-2 flex cursor-pointer flex-row items-center rounded-sm p-1 pl-2 text-xs',
                                  'hover:bg-red-500/40',
                                )}>
                                <Trash className="mr-2 h-4 items-center text-gray-500 group-hover:text-white" />{' '}
                                <span>Delete Task</span>
                              </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>
                                  Are you sure you want to delete this Task?
                                </DialogTitle>
                                <DialogDescription className="font-bold text-red-500">
                                  {task.taskName}
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button
                                  variant="destructive"
                                  onClick={() => handleDeleteTask(task.id)}>
                                  Delete
                                </Button>
                                <DialogClose>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
            </div>
            {/* Task input field */}
            {addingTaskId === board.id && (
              <div className="mt-2" ref={taskInputWrapperRef}>
                <input
                  ref={inputRef}
                  type="text"
                  value={taskName}
                  onChange={e => setTaskName(e.target.value)}
                  onBlur={handleInputBlur}
                  placeholder="Task name..."
                  className={cn(
                    'w-full rounded-lg border border-gray-600 bg-primary px-4 py-2 text-white',
                    'focus:outline-none focus:ring-1 focus:ring-purple-500',
                  )}
                />

                {taskNameError && <div className="mt-2 text-red-500">{taskNameError}</div>}

                <Button
                  ref={saveButtonRef}
                  variant={'save'}
                  onClick={() => handleTaskSubmit(board.id)}
                  className="mt-2 rounded-lg px-10 py-3 font-semibold transition"
                  disabled={createTask.isPending}>
                  {createTask.isPending ? 'Saving...' : 'Save'}
                </Button>
              </div>
            )}

            <Button
              onClick={() => setAddingTaskId(board.id)}
              className={cn(
                'bg-inherit/20 mt-2 w-full text-left text-base text-gray-500',
                'hover:bg-white/10 active:bg-white/20',
              )}>
              <Plus /> Add task
            </Button>
          </Card>
        </section>
      ))}
    </div>
  )
}
