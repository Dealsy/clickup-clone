import { cn } from '@/lib/utils'

export default function Pill({ children }: { children: string }) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-sm bg-primary px-2 py-0.5 text-xs',
        'uppercase text-primary-foreground',
      )}>
      {children}
    </div>
  )
}
