import AddNewBoardForm from "./AddNewBoardForm";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export default function AddNewBoardDialog({
  handleClose,
}: {
  handleClose: () => void;
}) {
  return (
    <DialogContent
      className="w-4/5 max-w-[500px] rounded-lg"
      aria-describedby={undefined}
    >
      <DialogHeader className="flex flex-col items-start text-left">
        <DialogTitle>Add New Board</DialogTitle>
      </DialogHeader>

      <AddNewBoardForm onClose={handleClose} />
    </DialogContent>
  );
}
