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
  boardIndex: 0,
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
      state;
    }),
  EditTask: (task, boardIndex, statusIndex) => {},
  deleteTask: (taskId, boardIndex, statusIndex) =>
    set((state) => {
      state.boards[boardIndex].statuses[statusIndex].tasks = state.boards[
        boardIndex
      ].statuses[statusIndex].tasks.filter((task) => task.id !== taskId);
    }),

  updateTotalTasks: () => {
    set((state) => {
      state.boards[0].statuses[0].totalTasks =
        state.boards[0].statuses[0].tasks.length;
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
    //useBoardStore.getState().updateTotalTasks();
  },
  { equalityFn: shallow, fireImmediately: true }
);
