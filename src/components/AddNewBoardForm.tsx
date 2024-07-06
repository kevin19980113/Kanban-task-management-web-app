import { cn } from "@/lib/utils";
import DynamicInput from "./DynamicInput";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { BoardSchema, BoardSchemaType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBoardStore } from "@/hooks/use-board";
import { useShallow } from "zustand/react/shallow";
import { v4 as uuidv4 } from "uuid";
import { Board } from "@/types/board";

export default function AddNewBoardForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BoardSchemaType>({
    resolver: zodResolver(BoardSchema),
    defaultValues: {
      boardName: "",
      columns: [{ column: "" }],
    },
  });

  const { addBoard, setBoardIndex, totalBoards } = useBoardStore(
    useShallow((state) => ({
      addBoard: state.addBoard,
      setBoardIndex: state.setBoardIndex,
      totalBoards: state.totalBoards,
    }))
  );

  const handleAddBoard = (formData: BoardSchemaType) => {
    const statuses = formData.columns.map((column) => ({
      id: uuidv4(),
      title: column.column,
      tasks: [],
      totalTasks: 0,
    }));
    const boardData: Board = {
      id: uuidv4(),
      title: formData.boardName,
      statuses,
    };
    addBoard(boardData);
    setBoardIndex(totalBoards);
    onClose();
  };

  return (
    <form
      className="w-full grid grid-cols-1 gap-y-4"
      onSubmit={handleSubmit(handleAddBoard)}
    >
      <div className="grid grid-cols-1 items-left gap-y-3">
        <Label htmlFor="name">Board Name</Label>
        <Input
          {...register("boardName")}
          placeholder="e.g Web Design"
          className={cn({
            "border-red-500 focus-visible:ring-red-500": errors.boardName,
          })}
        />
        {errors.boardName && (
          <p className="text-red-500 text-xs md:text-sm">
            {errors.boardName.message}
          </p>
        )}
      </div>
      <DynamicInput
        control={control}
        register={register}
        errors={errors}
        fieldName="columns"
        label="Board Columns"
        placeholder="e.g Design"
      />

      <Button type="submit">Create New Board</Button>
    </form>
  );
}
