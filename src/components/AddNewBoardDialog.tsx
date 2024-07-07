import AddOrEditBoardForm from "./AddOrEditBoardForm";
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

      <AddOrEditBoardForm onClose={handleClose} action="Add" />
    </DialogContent>
  );
}
