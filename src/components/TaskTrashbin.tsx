import { useBoardStore } from "@/hooks/use-board";
import { Flame, Trash } from "lucide-react";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

export default function TaskTrashbin({
  onChangeGrabActive,
}: {
  onChangeGrabActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [active, setActive] = useState(false);
  const { boardIndex, statusIndex, deleteTask } = useBoardStore(
    useShallow((state) => ({
      boardIndex: state.boardIndex,
      statusIndex: state.statusIndex,
      deleteTask: state.deleteTask,
    }))
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const hanldeDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const taskId = e.dataTransfer.getData("taskId");

    deleteTask(taskId, boardIndex, statusIndex);
    onChangeGrabActive(false);
    setActive(false);
  };

  return (
    <div
      className={`fixed top-10 w-[200px] md:w-[250px] h-[100px] left-1/2 -translate-x-1/2 rounded-full flex justify-center 
    items-center bg-red-100 z-50 ${active ? "opacity-100" : "opacity-50"}`}
      onDragOver={handleDragOver}
      onDragLeave={hanldeDragLeave}
      onDrop={handleDragEnd}
    >
      {active ? (
        <Flame className="text-destructive size-10" />
      ) : (
        <Trash className="text-destructive size-10" />
      )}
    </div>
  );
}
