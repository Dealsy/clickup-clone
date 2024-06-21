import StatusGroup from '@/components/addGroup'
import BoardGroups from '@/components/boards/boardGroups'

export default function Board() {
  return (
    <div className="flex flex-row gap-4">
      <BoardGroups />
      <StatusGroup />
    </div>
  )
}
