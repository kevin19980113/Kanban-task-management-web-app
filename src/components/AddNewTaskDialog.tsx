import { useState } from "react";
import AddNewTaskForm from "./AddNewTaskForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function AddNewTaskDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full px-4 py-[4px] md:py-3 text-xl md:text-sm lg:text-base">
          <span className="md:hidden">+</span>
          <span className="hidden md:inline">+ Add New Task</span>
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        <AddNewTaskForm onClose={handleDialogClose} />
      </DialogContent>
    </Dialog>
  );
}
