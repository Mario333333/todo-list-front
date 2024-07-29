import { create } from "zustand";

interface State {
  error: string | null;
  setError: (error: string | null) => void;
}

export const useErrorStore = create<State>()((set) => ({
  error: null,
  setError: (error: string | null) => {
    set({ error: error });
  },
}));
