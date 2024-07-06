import { useBoardStore } from "@/hooks/use-board";
import { useShallow } from "zustand/react/shallow";
import TaskCard from "./TaskCard";

export default function StatusesGrid() {
  const { boards, boardIndex } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      boardIndex: state.boardIndex,
    }))
  );

  return (
    <div
      className="w-full flex-grow overflow-scroll p-4 md:p-8 grid"
      style={{
        gridTemplateColumns: `repeat(${boards[boardIndex].statuses.length}, minmax(250px, 1fr))`,
      }}
    >
      {boards[boardIndex].statuses.map((status) => (
        <div key={status.id} className="grid grid-cols-1 px-4">
          <div className="flex flex-col items-start gap-y-6 text-left text-medium-grey tracking-wider">
            <div className="w-full mb-4 text-base tracking-widest">{`${status.title} (${status.totalTasks})`}</div>
            {status.tasks.map((task) => (
              <TaskCard key={task.id} task={task} status={status} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}