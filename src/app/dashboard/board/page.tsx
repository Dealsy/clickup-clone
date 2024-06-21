import StatusGroup from "@/components/addGroup";
import BoardCard from "@/components/boardCard";
import BoardGroup from "@/components/boardGroup";

export default function Board() {
  return (
    <div className="flex flex-row gap-4">
      <div>
        <BoardGroup>
          <BoardCard />
        </BoardGroup>
      </div>
      <div>
        <BoardGroup></BoardGroup>
      </div>
      <StatusGroup />
    </div>
  );
}
