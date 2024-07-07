import { cn, defaultColor, isTitleDuplicate } from "@/lib/utils";
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
import { toast } from "sonner";
import { useState } from "react";

export default function AddOrEditBoardForm({
  action,
  onClose,
  board,
}: {
  action: "Add" | "Edit";
  onClose: () => void;
  board?: Board;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BoardSchemaType>({
    resolver: zodResolver(BoardSchema),
    defaultValues: board
      ? {
          boardName: board.title,
          columns: board.statuses.map((status) => ({
            column: status.title,
          })),
        }
      : {
          boardName: "",
        },
  });

  const {
    boards,
    boardIndex,
    addBoard,
    editBoard,
    setBoardIndex,
    totalBoards,
  } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      boardIndex: state.boardIndex,
      addBoard: state.addBoard,
      editBoard: state.editBoard,
      setBoardIndex: state.setBoardIndex,
      totalBoards: state.totalBoards,
    }))
  );

  const [selectedColors, setSelectedColors] = useState<string[]>(
    board?.statuses.map((status) => status.color) || []
  );

  const handleColorChange = (color: string, index: number) => {
    setSelectedColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = color;
      return newColors;
    });
  };

  const handleAddBoard = (formData: BoardSchemaType) => {
    if (isTitleDuplicate(formData.boardName, "Board", boards)) {
      toast.warning(`Board name '${formData.boardName}' already exists!`);
      return;
    }

    const statuses = formData.columns.map((column, index) => ({
      id: uuidv4(),
      title: column.column,
      tasks: [],
      totalTasks: 0,
      color: selectedColors[index] || defaultColor,
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

  const handleEditBoard = (formData: BoardSchemaType) => {
    if (
      isTitleDuplicate(formData.boardName, "Board", boards) &&
      formData.boardName !== board?.title
    ) {
      toast.warning(`Board name '${formData.boardName}' already exists!`);
      return;
    }

    const hasDuplicateColumns = formData.columns.some(
      (column, index, self) =>
        self.findIndex((c) => c.column === column.column) !== index
    );

    if (hasDuplicateColumns) {
      toast.warning("Duplicate column names are not allowed!");
      return;
    }

    const editedBoard: Board = {
      ...board!,
      title: formData.boardName,
      statuses: formData.columns.map((column, index) => {
        const existingStatus = board?.statuses[index];
        return {
          id: existingStatus?.id || uuidv4(),
          title: column.column,
          tasks: existingStatus?.tasks || [],
          totalTasks: existingStatus?.totalTasks || 0,
          color: selectedColors[index] || defaultColor,
        };
      }),
    };
    editBoard(editedBoard, boardIndex);
    onClose();
  };

  return (
    <form
      className="w-full grid grid-cols-1 gap-y-4"
      onSubmit={handleSubmit(
        action === "Add" ? handleAddBoard : handleEditBoard
      )}
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
        action={action}
        onColorChange={handleColorChange}
        selectedColors={selectedColors}
      />

      <Button type="submit">
        {action === "Add" ? "Create New Board" : "Save Changes"}
      </Button>
    </form>
  );
}
