import type { StateCreator } from 'zustand';

export interface CounterState {
  readonly count: number; // ❌ useCounter().count = 5
  readonly decrease: () => void; // ❌ useCounter().decrease = () => console.log('override')
  readonly increase: () => void; // ❌ useCounter().increase = null
}

export const createCounterSlice: StateCreator<CounterState> = (set) => ({
  count: 0,
  decrease: () => set((state: CounterState) => ({ count: state.count - 1 })),
  increase: () => set((state: CounterState) => ({ count: state.count + 1 })),
});
