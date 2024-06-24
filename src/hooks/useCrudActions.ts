import { useQueryClient } from '@tanstack/react-query'
import { api } from '@/trpc/react'
import { useState } from 'react'

export default function useCrudActions() {
  const queryClient = useQueryClient()
  const [editGroupId, setEditGroupId] = useState<number | null>(null)
  const [addingTaskId, setAddingTaskId] = useState<number | null>(null)
  const [taskName, setTaskName] = useState('')
  const [newTaskName, setNewTaskName] = useState('')
  const [editTaskId, setEditTaskId] = useState<number | null>(null)

  const rename = api.board.update.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries()
      setEditGroupId(null)
    },
  })

  const createTask = api.task.create.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries()
      setAddingTaskId(null)
      setTaskName('')
    },
  })

  const renameTask = api.task.update.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries()
      setEditTaskId(null)
      setNewTaskName('')
    },
  })

  const deleteGroupAndTasks = api.board.deleteGroupAndTasks.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries()
    },
  })

  const deleteByTaskId = api.task.deleteByTaskId.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries()
    },
  })

  const deleteByBoardGroupId = api.task.deleteByBoardGroupId.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries()
    },
  })

  const deleteTask = (TaskId: number) => {
    deleteByTaskId.mutate({ taskId: TaskId })
    deleteByBoardGroupId.mutate({ boardGroupId: TaskId })
  }

  return {
    rename,
    createTask,
    deleteTask,
    deleteGroupAndTasks,
    editGroupId,
    setEditGroupId,
    addingTaskId,
    setAddingTaskId,
    taskName,
    setTaskName,
    renameTask,
    setNewTaskName,
    newTaskName,
    editTaskId,
    setEditTaskId,
  }
}
