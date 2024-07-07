import { CirclePicker, ColorResult } from "react-color";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useBoardStore } from "@/hooks/use-board";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";
import { defaultColor, defaultColors } from "@/lib/utils";

export default function ColorPicker({
  index,
  action,
  onColorChange,
  initialColor,
}: {
  index: number;
  action: "Add" | "Edit";
  onColorChange: (color: string) => void;
  initialColor: string;
}) {
  // const { boards, boardIndex, setColor } = useBoardStore(
  //   useShallow((state) => ({
  //     boards: state.boards,
  //     boardIndex: state.boardIndex,
  //     colors: state.colors,
  //     setColor: state.setColor,
  //   }))
  // );
  const [currentColor, setCurrentColor] = useState(initialColor);
  const [isOpen, setIsOpen] = useState(false);

  const handleColorChange = (color: ColorResult) => {
    setCurrentColor(color.hex);
    onColorChange(color.hex);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div
          className="size-7 border-[3px] border-medium-grey/40 dark:border-medium-grey rounded-3xl bg-red-400 
        cursor-pointer hover:scale-105 hover:border-main-purple dark:hover:border-main-purple"
          style={{ backgroundColor: currentColor }}
        ></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4">
        <CirclePicker colors={defaultColors} onChange={handleColorChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
