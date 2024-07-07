import { CirclePicker, ColorResult } from "react-color";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import { defaultColors } from "@/lib/utils";

export default function ColorPicker({
  onColorChange,
  initialColor,
}: {
  onColorChange: (color: string) => void;
  initialColor: string;
}) {
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
          className="size-6 rounded-full flex-shrink-0 border-[3px] border-medium-grey/40 dark:border-medium-grey bg-red-400 
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
