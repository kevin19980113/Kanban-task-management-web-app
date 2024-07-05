import { Button } from "./ui/button";

export default function MainBoard() {
  return (
    <div className="w-full flex-grow my-auto flex flex-col items-center justify-center gap-y-6 relative">
      <div className="text-sm lg:text-base text-medium-grey font-medium px-8 text-center">
        This board is empty, Create a new column to get started.
      </div>
      <Button className="text-sm lg:text-base rounded-3xl">
        + Add New Column
      </Button>
    </div>
  );
}
