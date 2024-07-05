import { useState } from "react";
import BoarderList from "./BoarderList";
import { Dialog } from "./ui/dialog";
import AddNewBoardDialog from "./AddNewBoardDialog";
import ThemeSwitch from "./ThemeSwitch";
import lightLogo from "../assets/logo-light.svg";
import darkLogo from "../assets/logo-dark.svg";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "./ui/button";
import { EyeOff } from "lucide-react";

export default function Sidebar({
  toggleSidebar,
  isSidebarVisible,
}: {
  toggleSidebar: () => void;
  isSidebarVisible: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={`hidden md:flex flex-col items-start justify-between max-w-[300px] lg:max-w-[350px] h-screen bg-white
      dark:bg-dark-grey border-r border-lines-light dark:border-lines-dark z-50 py-8 ${
        isSidebarVisible ? "translate-x-0" : "-translate-x-full absolute"
      } transition-all`}
      >
        <div className="flex flex-col items-left gap-y-8">
          <img
            src={theme === "light" ? darkLogo : lightLogo}
            alt="logo"
            className="w-8/12 ml-4"
          />

          <BoarderList />
        </div>

        <div className="w-full flex flex-col items-start gap-y-6 px-4">
          <div className="w-full">
            <ThemeSwitch />
          </div>
          <Button
            variant="ghost"
            className="flex items-center gap-x-2 text-medium-grey rounded-r-full -ml-4 pr-20 py-3"
            onClick={() => toggleSidebar()}
          >
            <EyeOff className="size-5" />
            hide Sidebar
          </Button>
        </div>
      </div>

      <AddNewBoardDialog handleClose={handleClose} />
    </Dialog>
  );
}
