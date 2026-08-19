import { create } from 'zustand'
import {
  rollCheck,
  rollFreeDice,
  type CheckRollResult,
  type DiceSides,
  type FreeDiceRollResult,
} from '@/utils/dice'
import { createId } from '@/utils/id'

export type DiceHistoryEntry =
  | ({ kind: 'check'; id: string; at: number } & CheckRollResult)
  | ({ kind: 'free'; id: string; at: number } & FreeDiceRollResult)

interface DiceStoreState {
  history: DiceHistoryEntry[]
  lastRoll: DiceHistoryEntry | null
  trayOpen: boolean
  rollCheck: (
    label: string,
    modifier: number,
    breakdown?: Array<{ label: string; value: number }>,
  ) => DiceHistoryEntry
  rollFree: (
    sides: DiceSides,
    count?: number,
    modifier?: number,
    label?: string,
  ) => DiceHistoryEntry
  clearHistory: () => void
  setTrayOpen: (open: boolean) => void
  toggleTray: () => void
  dismissLast: () => void
}

const MAX_HISTORY = 40

function pushHistory(
  history: DiceHistoryEntry[],
  entry: DiceHistoryEntry,
): DiceHistoryEntry[] {
  return [entry, ...history].slice(0, MAX_HISTORY)
}

export const useDiceStore = create<DiceStoreState>((set, get) => ({
  history: [],
  lastRoll: null,
  trayOpen: false,

  rollCheck: (label, modifier, breakdown) => {
    const result = rollCheck(label, modifier, breakdown)
    const entry: DiceHistoryEntry = {
      kind: 'check',
      id: createId('roll'),
      at: Date.now(),
      ...result,
    }
    set({
      lastRoll: entry,
      history: pushHistory(get().history, entry),
    })
    return entry
  },

  rollFree: (sides, count = 1, modifier = 0, label) => {
    const result = rollFreeDice(sides, count, modifier, label)
    const entry: DiceHistoryEntry = {
      kind: 'free',
      id: createId('roll'),
      at: Date.now(),
      ...result,
    }
    set({
      lastRoll: entry,
      history: pushHistory(get().history, entry),
    })
    return entry
  },

  clearHistory: () => set({ history: [], lastRoll: null }),
  setTrayOpen: (open) => set({ trayOpen: open }),
  toggleTray: () => set({ trayOpen: !get().trayOpen }),
  dismissLast: () => set({ lastRoll: null }),
}))
