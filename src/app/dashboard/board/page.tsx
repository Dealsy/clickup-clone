'use client'
import StatusGroup from '@/components/addGroup'
import BoardGroups from '@/components/boards/boardGroups'
import { useRef, useEffect } from 'react'

export default function Board() {
  const containerRef = useRef<HTMLDivElement>(null)
  let isDown = false
  let startX: number
  let scrollLeft: number

  useEffect(() => {
    const container = containerRef.current

    if (!container) return

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true
      startX = e.pageX - container.offsetLeft
      scrollLeft = container.scrollLeft
      container.classList.add('active')
    }

    const handleMouseLeave = () => {
      isDown = false
      container.classList.remove('active')
    }

    const handleMouseUp = () => {
      isDown = false
      container.classList.remove('active')
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = (x - startX) * 1 // Scroll-fast
      container.scrollLeft = scrollLeft - walk
    }

    container.addEventListener('mousedown', handleMouseDown)
    container.addEventListener('mouseleave', handleMouseLeave)
    container.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('mousemove', handleMouseMove)

    return () => {
      container.removeEventListener('mousedown', handleMouseDown)
      container.removeEventListener('mouseleave', handleMouseLeave)
      container.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-full flex-row gap-4 overflow-x-auto pr-40" ref={containerRef}>
        <BoardGroups />
        <StatusGroup />
      </div>
    </div>
  )
}
