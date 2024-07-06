import { StateCreator, create } from "zustand";
import { BoardSlice, BoardState, IndexSlice, IndexState } from "@/types/board";
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";

const initialBoardState: BoardState = {
  boards: [],
  totalBoards: 0,
};

const initialIndexState: IndexState = {
  boardIndex: -1,
  statusIndex: -1,
};

const createBoardSlice: StateCreator<
  BoardSlice,
  [["zustand/immer", never], ["zustand/subscribeWithSelector", never]],
  [],
  BoardSlice
> = (set) => ({
  ...initialBoardState,
  addBoard: (board) =>
    set((state) => {
      state.boards.push(board);
    }),
  deleteBoard: (boardId) =>
    set((state) => {
      state.boards = state.boards.filter((board) => board.id !== boardId);
    }),
  updateTotalBoards: () =>
    set((state) => {
      state.totalBoards = state.boards.length;
    }),
  addStatus: (status, boardIndex) =>
    set((state) => {
      state.boards[boardIndex].statuses.push(status);
    }),
  addTask: (task, boardIndex, statusIndex) =>
    set((state) => {
      state.boards[boardIndex].statuses[statusIndex].tasks.push(task);
      state.boards[boardIndex].statuses[statusIndex].totalTasks =
        state.boards[boardIndex].statuses[statusIndex].tasks.length;
    }),

  deleteTask: (taskId, boardIndex, statusIndex) =>
    set((state) => {
      state.boards[boardIndex].statuses[statusIndex].tasks = state.boards[
        boardIndex
      ].statuses[statusIndex].tasks.filter((task) => task.id !== taskId);
      state.boards[boardIndex].statuses[statusIndex].totalTasks =
        state.boards[boardIndex].statuses[statusIndex].tasks.length;
    }),
  EditTask: (task, boardIndex, statusIndex) => {},
  changeStatus(task, newStatusId, boardIndex) {
    set((state) => {
      const board = state.boards[boardIndex];

      board.statuses.forEach((status) => {
        const taskIndex = status.tasks.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
          status.tasks.splice(taskIndex, 1);
          status.totalTasks = status.tasks.length;
        }
      });

      const newStatusIndex = board.statuses.findIndex(
        (status) => status.id === newStatusId
      );
      if (newStatusIndex !== -1) {
        board.statuses[newStatusIndex].tasks.push(task);
        board.statuses[newStatusIndex].totalTasks =
          board.statuses[newStatusIndex].tasks.length;
      }
    });
  },
  subTaskToggle: (taskId, subTaskId, boardIndex, statusIndex) => {
    set((state) => {
      state.boards[boardIndex].statuses[statusIndex].tasks.map((task) => {
        if (task.id === taskId) {
          task.subTasks.map((subTask) => {
            if (subTask.id === subTaskId) {
              subTask.done = !subTask.done;
            }
          });
        }
      });
    });
  },
});

const createIndexSlice: StateCreator<
  IndexSlice,
  [["zustand/immer", never], ["zustand/subscribeWithSelector", never]],
  [],
  IndexSlice
> = (set) => ({
  ...initialIndexState,
  setBoardIndex: (boardIndex) =>
    set((state) => {
      state.boardIndex = boardIndex;
    }),
  setStatusIndex: (statusIndex) =>
    set((state) => {
      state.statusIndex = statusIndex;
    }),
});

export const useBoardStore = create<BoardSlice & IndexSlice>()(
  subscribeWithSelector(
    persist(
      immer((...a) => ({
        ...createBoardSlice(...a),
        ...createIndexSlice(...a),
      })),
      {
        name: "board-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          boards: state.boards,
          totalBoards: state.totalBoards,
          boardIndex: state.boardIndex,
        }),
      }
    )
  )
);

useBoardStore.subscribe(
  (state) => state.boards,
  () => {
    useBoardStore.getState().updateTotalBoards();
  },
  { equalityFn: shallow, fireImmediately: true }
);
