import AddNewBoardForm from "./AddNewBoardForm";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export default function AddNewBoardDialog({
  handleClose,
}: {
  handleClose: () => void;
}) {
  return (
    <DialogContent aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>Add New Board</DialogTitle>
      </DialogHeader>

      <AddNewBoardForm onClose={handleClose} />
    </DialogContent>
  );
}
