import { createSignal } from 'solid-js'
import { restartAttempt } from '../helpers/stateHelpers'
import { TestTimeoutDuration } from '../constants'

const [timeoutFunction, setTimeoutFunction] = createSignal<NodeJS.Timeout | undefined>(undefined)

export const resetTestTimeout = () => {
  clearTestTimeout()
  const timeout = setTimeout(() => restartAttempt(), TestTimeoutDuration)
  setTimeoutFunction(timeout)
}

export const clearTestTimeout = () => {
  clearTimeout(timeoutFunction?.())
}
