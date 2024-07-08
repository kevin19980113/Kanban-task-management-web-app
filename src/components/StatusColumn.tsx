import { useState } from "react";
import TaskCard from "./TaskCard";
import { StatusState, Task } from "@/types/board";
import { useBoardStore } from "@/hooks/use-board";
import { useShallow } from "zustand/react/shallow";

export default function SatusColumn({
  status,
  columnIndex,
  onChangeGrabActive,
}: {
  status: StatusState;
  columnIndex: number;
  onChangeGrabActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isActive, setIsActive] = useState(false);
  const { boardIndex, statusIndex, moveTask } = useBoardStore(
    useShallow((state) => ({
      boardIndex: state.boardIndex,
      statusIndex: state.statusIndex,
      moveTask: state.moveTask,
    }))
  );

  const handleDragStart = (e: React.DragEvent<HTMLElement>, task: Task) => {
    e.dataTransfer.setData("taskId", task.id);
    onChangeGrabActive(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    highlightIndicator(e);

    setIsActive(true);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLElement>) => {
    const taskId = e.dataTransfer.getData("taskId");

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const beforeTaskId = element.dataset.before || "-1";

    moveTask(taskId, beforeTaskId, boardIndex, statusIndex, columnIndex);

    setIsActive(false);
    onChangeGrabActive(false);
    clearHighlights();
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: React.DragEvent<HTMLElement>) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (
    e: React.DragEvent<HTMLElement>,
    indicators: HTMLElement[]
  ) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        // if offset is negative => cursor is above the element
        // if offset is bigger thatn closest.offset, then this offset is closer (because offset is negative value)

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      } // if cursor is already passed over last element, return last indicator
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${columnIndex}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setIsActive(false);
  };

  return (
    <div
      className={`flex flex-col p-4 rounded-xl items-start gap-y-6 text-left text-medium-grey tracking-wider ${
        isActive ? "bg-dark-grey/20 dark:bg-dark-grey/60" : ""
      }`}
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="flex gap-x-3 items-center justify-start">
        <div
          className="size-4 flex-shrink-0 rounded-full mb-4 text-base tracking-widest"
          style={{ backgroundColor: status.color }}
        />
        <div className="w-full mb-4 text-base tracking-widest">
          {`${status.title} (${status.totalTasks})`}
        </div>
      </div>

      {status.tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          status={status}
          handleDragStart={handleDragStart}
        />
      ))}

      <DropIndicator beforeId={null} columnIndex={columnIndex} />
    </div>
  );
}

export const DropIndicator = ({
  beforeId,
  columnIndex,
}: {
  beforeId: string | null;
  columnIndex: number;
}) => {
  return (
    <div
      data-before={beforeId || -1}
      //   beforeId(taskId) that we want to move card ahead of card with beforeId(TaskId)
      data-column={columnIndex}
      className="w-full bg-main-purple my-0.5 h-0.5 opacity-0"
    />
  );
};
