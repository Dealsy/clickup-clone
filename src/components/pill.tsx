import { cn } from '@/lib/utils'

type PillProps = {
  children: React.ReactNode
  className?: string
}

export default function Pill({ children, className }: PillProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-sm bg-primary px-2 py-0.5 text-xs',
        'text-primary-foreground',
        className,
      )}>
      {children}
    </div>
  )
}
