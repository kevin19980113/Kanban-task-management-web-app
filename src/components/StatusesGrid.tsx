import { useBoardStore } from "@/hooks/use-board";
import { useShallow } from "zustand/react/shallow";
import AddNewColumnDialog from "./AddNewColumnDialog";
import TaskTrashbin from "./TaskTrashbin";
import { useState } from "react";
import StatusColumn from "./StatusColumn";

export default function StatusesGrid() {
  const { boards, boardIndex } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      boardIndex: state.boardIndex,
    }))
  );
  const [isGrabbed, setIsGrabbed] = useState(false);

  return (
    <div
      className="w-full flex-grow p-4 md:p-8 grid relative"
      style={{
        gridTemplateColumns: `repeat(${
          boards[boardIndex].statuses.length + 1
        }, minmax(250px, 1fr))`,
      }}
    >
      {boards[boardIndex].statuses.map((status, index) => (
        <div key={status.id} className="grid grid-cols-1 px-4">
          <StatusColumn
            status={status}
            columnIndex={index}
            onChangeGrabActive={setIsGrabbed}
          />
        </div>
      ))}
      {isGrabbed && <TaskTrashbin onChangeGrabActive={setIsGrabbed} />}
      <AddNewColumnDialog sort="IN COLUMN" />
    </div>
  );
}
