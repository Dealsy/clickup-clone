'use client'
import { useState } from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function StatusGroup() {
  const [isAdding, setIsAdding] = useState(false)
  const [statusName, setStatusName] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

  const colors = [
    { bg: 'bg-purple-500', ring: 'ring-custom-purple' },
    { bg: 'bg-blue-500', ring: 'ring-custom-blue' },
    { bg: 'bg-emerald-500', ring: 'ring-custom-emerald' },
    { bg: 'bg-green-500', ring: 'ring-custom-green' },
    { bg: 'bg-yellow-500', ring: 'ring-custom-yellow' },
    { bg: 'bg-orange-500', ring: 'ring-custom-orange' },
    { bg: 'bg-pink-500', ring: 'ring-custom-pink' },
    { bg: 'bg-red-500', ring: 'ring-custom-red' },
    { bg: 'bg-indigo-500', ring: 'ring-custom-indigo' },
    { bg: 'bg-teal-500', ring: 'ring-custom-teal' },
    { bg: 'bg-gray-500', ring: 'ring-custom-gray' },
    { bg: 'bg-cyan-500', ring: 'ring-custom-cyan' },
    { bg: 'bg-lime-500', ring: 'ring-custom-lime' },
    { bg: 'bg-rose-500', ring: 'ring-custom-rose' },
  ]

  const handleColorClick = (color: string) => {
    setSelectedColor(color)
  }

  return (
    <div className="rounded-lg bg-background p-4">
      <Button
        className="bg-background text-base text-gray-500 hover:bg-white/10 active:bg-white/20"
        onClick={() => setIsAdding(!isAdding)}>
        <Plus /> Add group
      </Button>

      {isAdding && (
        <div className="w-[250px]">
          <input
            type="text"
            value={statusName}
            onChange={e => setStatusName(e.target.value)}
            placeholder="STATUS NAME"
            className={cn(
              'mb-4 mt-4 w-full rounded-lg bg-background p-2 text-white',
              'border border-gray-600 placeholder:text-xs placeholder:text-gray-300',
              'focus:outline-none focus:ring-1 focus:ring-purple-500',
            )}
          />
          <div className="mb-4 flex flex-wrap gap-1.5 rounded-lg border border-gray-600 p-2">
            {colors.map(({ bg, ring }) => (
              <div
                key={bg}
                className={`h-5 w-5 rounded-full p-0.5 ${
                  selectedColor === bg ? `ring-2 ${ring}` : ''
                }`}
                onClick={() => handleColorClick(bg)}>
                <div className={`h-full w-full cursor-pointer rounded-full ${bg}`}></div>
              </div>
            ))}
          </div>
          <button
            className="w-full rounded bg-purple-500 p-2 text-white hover:bg-purple-600"
            onClick={() => {
              setIsAdding(false)
              // Add logic to save the group here
            }}>
            Save
          </button>
        </div>
      )}
    </div>
  )
}
