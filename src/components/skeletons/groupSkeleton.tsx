import { Skeleton } from '../ui/skeleton'

export default function GroupSkeleton() {
  return (
    <Skeleton className="flex h-[100px] flex-col bg-background">
      <Skeleton className="flex h-[100px] flex-row gap-4 overflow-x-auto pr-40" />
      <div className="flex flex-row gap-4">
        <Skeleton className="h-[120px] min-w-[360px] rounded-lg bg-primary p-1" />
        <Skeleton className="h-[120px] min-w-[360px] rounded-lg bg-primary p-1" />
        <Skeleton className="h-[120px] min-w-[360px] rounded-lg bg-primary p-1" />
        <Skeleton className="h-[120px] min-w-[360px] rounded-lg bg-primary p-1" />
      </div>
    </Skeleton>
  )
}
