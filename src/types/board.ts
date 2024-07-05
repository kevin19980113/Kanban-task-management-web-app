type subTask = {
  title: string;
  done: boolean;
};

type Task = {
  id: string;
  title: string;
  description: string;
  subTasks: subTask[];
};

type TaskAction = {
  addTask: (task: Task, boardIndex: number, statusIndex: number) => void;
  EditTask: (task: Task, boardIndex: number, statusIndex: number) => void;
  deleteTask: (taskId: string, boardIndex: number, statusIndex: number) => void;
};

type StatusAction = {
  updateTotalTasks: () => void;
  addStatus: (status: StatusState, boardIndex: number) => void;
};

export type StatusState = {
  id: string;
  title: string;
  tasks: Task[];
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
  addBoard: (board: Board) => void;
  deleteBoard: (boardId: string) => void;
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
