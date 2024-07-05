import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

type DeleteDialogProps = {
  sort: "board" | "task";
  description: string;
  handleDelete?: () => void;
};

export default function DeleteDialog({
  sort,
  description,
  handleDelete,
}: DeleteDialogProps) {
  return (
    <AlertDialogContent className="w-11/12 max-w-[600px] rounded-lg">
      <AlertDialogHeader className="w-full flex flex-col items-start text-left">
        <AlertDialogTitle className="text-destructive">
          {`Delete This ${sort}?`}
        </AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Button variant="destructive" className="rounded-full">
          Delete
        </Button>
        <Button variant="secondary" className="rounded-full">
          Cancel
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
