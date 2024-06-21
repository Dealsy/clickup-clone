import { Plus } from 'lucide-react'
import Pill from './pill'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export default function BoardGroup({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-[360px] rounded-lg bg-gray-500/5 p-2">
      <Pill>TO do</Pill>
      {children}
      <Button
        className={cn(
          'bg-inherit/20 mt-2 w-full text-left text-base text-gray-500',
          'hover:bg-white/10 active:bg-white/20',
        )}>
        <Plus /> Add task
      </Button>
    </div>
  )
}
