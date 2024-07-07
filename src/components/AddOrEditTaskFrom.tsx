import { cn, isTitleDuplicate } from "@/lib/utils";
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
import { Task } from "@/types/board";
import { toast } from "sonner";

export default function AddOrEditTaskForm({
  action,
  onClose,
  task,
}: {
  action: "Add" | "Edit";
  onClose: () => void;
  task?: Task;
}) {
  const { boards, addTask, EditTask, boardIndex, statusIndex } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      addTask: state.addTask,
      EditTask: state.EditTask,
      boardIndex: state.boardIndex,
      statusIndex: state.statusIndex,
    }))
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskSchemaType>({
    resolver: zodResolver(TaskSchema),
    defaultValues: task
      ? {
          title: task.title,
          description: task.description,
          subTasks: task.subTasks.map((subTask) => ({
            title: subTask.title,
          })),
          status: boards[boardIndex].statuses[statusIndex].title,
        }
      : {
          title: "",
          description: "",
          subTasks: [{ title: "" }],
          status: "",
        },
  });

  const handleAddTask = (formData: TaskSchemaType) => {
    if (
      isTitleDuplicate(formData.title, "Task", boards, boardIndex, statusIndex)
    ) {
      toast.warning(`Task name '${formData.title}' already exists!`);
      return;
    }
    const subTasks = formData.subTasks.map((subTask) => ({
      id: uuidv4(),
      title: subTask.title,
      done: false,
    }));

    const newStatusIndex = boards[boardIndex].statuses.findIndex(
      (status) => status.title === formData.status
    );

    const newTask = {
      id: uuidv4(),
      title: formData.title,
      description: formData.description,
      subTasks,
    };
    addTask(newTask, boardIndex, newStatusIndex);
    onClose();
  };

  const handleEditTask = (formData: TaskSchemaType) => {
    if (
      task?.title !== formData.title &&
      isTitleDuplicate(formData.title, "Task", boards, boardIndex, statusIndex)
    ) {
      toast.warning(`Task name '${formData.title}' already exists!`);
      return;
    }

    const subTasks = formData.subTasks.map((subTask, index) => {
      const existingSubTask = task?.subTasks[index];
      return {
        id: existingSubTask?.id || uuidv4(),
        title: subTask.title,
        done: existingSubTask ? existingSubTask.done : false,
      };
    });

    const editedStatusIndex = boards[boardIndex].statuses.findIndex(
      (status) => status.title === formData.status
    );

    const isEditedStatus = statusIndex !== editedStatusIndex;

    const editedTask = {
      id: task!.id,
      title: formData.title,
      description: formData.description,
      subTasks,
    };

    EditTask(editedTask, boardIndex, editedStatusIndex, isEditedStatus);
    onClose();
  };

  return (
    <form
      className="w-full grid grid-cols-1 gap-y-4"
      onSubmit={handleSubmit(action === "Add" ? handleAddTask : handleEditTask)}
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
        action={action}
      />

      <div className="grid grid-cols-1 items-left gap-y-3">
        <StatusSelect isError={!!errors.status} control={control} />
        {errors.status && (
          <p className="text-red-500 text-xs md:text-sm">
            {errors.status.message}
          </p>
        )}
      </div>

      <Button type="submit">
        {action === "Add" ? "Create Task" : "Save Changes"}
      </Button>
    </form>
  );
}
