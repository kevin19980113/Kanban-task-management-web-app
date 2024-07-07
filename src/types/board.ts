export type SubTask = {
  id: string;
  title: string;
  done: boolean;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  subTasks: SubTask[];
};

type TaskAction = {
  addTask: (newTask: Task, boardIndex: number, newStatusIndex: number) => void;
  EditTask: (
    editedTask: Task,
    boardIndex: number,
    statusIndex: number,
    isEditedStatus: boolean
  ) => void;
  deleteTask: (taskId: string, boardIndex: number, statusIndex: number) => void;
  subTaskToggle: (
    taskId: string,
    subTaskId: string,
    boardIndex: number,
    statusIndex: number
  ) => void;
  changeStatus: (task: Task, newStatusId: string, boardIndex: number) => void;
  moveTask: (
    taskId: string,
    beforeTaskId: string,
    boarderIndex: number,
    fromStatusIndex: number,
    toStatusIndex: number
  ) => void;
};

type StatusAction = {
  addStatus: (newStatus: StatusState, boardIndex: number) => void;
};

export type StatusState = {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
  totalTasks: number;
};

export type Board = {
  id: string;
  title: string;
  statuses: StatusState[];
};

export type BoardState = {
  boards: Board[];
  totalBoards: number;
};

type BoardAction = {
  addBoard: (newBoard: Board) => void;
  deleteBoard: (boardId: string) => void;
  editBoard: (editedBoard: Board, boardIndex: number) => void;
  updateTotalBoards: () => void;
};

export type IndexState = {
  boardIndex: number;
  statusIndex: number;
};

type IndexAction = {
  setBoardIndex: (boardIndex: number) => void;
  setStatusIndex: (statusIndex: number) => void;
};

export type IndexSlice = IndexState & IndexAction;

export type BoardSlice = BoardState & BoardAction & TaskAction & StatusAction;
