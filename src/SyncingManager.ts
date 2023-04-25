import { createSignal } from 'solid-js'

const syncingDebounceDuration = 200

const [syncing, setSyncing] = createSignal(false)
const [syncingStopFunction, setSyncingStopFunction] = createSignal<NodeJS.Timeout | undefined>(
  undefined
)

export const isSyncing = syncing

export const startSyncing = () => {
  setSyncing(true)
}

export const stopSyncing = () => {
  clearTimeout(syncingStopFunction())
  const timeout = setTimeout(() => setSyncing(false), syncingDebounceDuration)
  setSyncingStopFunction(timeout)
}
