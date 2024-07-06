import { cn } from "@/lib/utils";
import DynamicInput from "./DynamicInput";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { TaskSchema, TaskSchemaType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBoardStore } from "@/hooks/use-board";
import { useShallow } from "zustand/react/shallow";
import { v4 as uuidv4 } from "uuid";
import { Textarea } from "./ui/textarea";
import StatusSelect from "./StatusSelect";

export default function AddNewTaskForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskSchemaType>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      subTasks: [{ subTask: "" }],
      status: "",
    },
  });

  const { boards, addTask, boardIndex } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      addTask: state.addTask,
      boardIndex: state.boardIndex,
    }))
  );

  const handleAddTask = (formData: TaskSchemaType) => {
    const subTasks = formData.subTasks.map((subTask) => ({
      id: uuidv4(),
      title: subTask.subTask,
      done: false,
    }));

    const statusIndex = boards[boardIndex].statuses.findIndex(
      (status) => status.title === formData.status
    );

    const task = {
      id: uuidv4(),
      title: formData.title,
      description: formData.description,
      subTasks,
    };
    addTask(task, boardIndex, statusIndex);
    onClose();
  };

  return (
    <form
      className="w-full grid grid-cols-1 gap-y-4"
      onSubmit={handleSubmit(handleAddTask)}
    >
      <div className="grid grid-cols-1 items-left gap-y-3">
        <Label htmlFor="title">Title</Label>
        <Input
          {...register("title")}
          placeholder="e.g Take Coffee Break"
          className={cn({
            "border-red-500 focus-visible:ring-red-500": errors.title,
          })}
        />
        {errors.title && (
          <p className="text-red-500 text-xs md:text-sm">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 items-left gap-y-3">
        <Label htmlFor="description">Description</Label>
        <Textarea
          {...register("description")}
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          className={cn({
            "border-red-500 focus-visible:ring-red-500": errors.description,
          })}
        />
        {errors.description && (
          <p className="text-red-500 text-xs md:text-sm">
            {errors.description.message}
          </p>
        )}
      </div>

      <DynamicInput
        control={control}
        register={register}
        errors={errors}
        fieldName="subTasks"
        label="Subtasks"
        placeholder="e.g Make coffee"
      />

      <div className="grid grid-cols-1 items-left gap-y-3">
        <StatusSelect isError={!!errors.status} control={control} />
        {errors.status && (
          <p className="text-red-500 text-xs md:text-sm">
            {errors.status.message}
          </p>
        )}
      </div>

      <Button type="submit">Create Task</Button>
    </form>
  );
}
