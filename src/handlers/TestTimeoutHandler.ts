import { createSignal } from 'solid-js'
import { restartAttempt, testStarted } from '../helpers/stateHelpers'
import { NotificationDuration, TestTimeoutDuration } from '../constants'
import { addNotification } from '../NotificationsHandler'

const [timeoutFunction, setTimeoutFunction] = createSignal<NodeJS.Timeout | undefined>(undefined)

export const resetTestTimeout = () => {
  clearTestTimeout()
  const timeout = setTimeout(() => {
    if (!testStarted()) return
    addNotification({
      type: 'warn',
      content: 'Test stopped due to inactivity.',
      duration: NotificationDuration,
    })
    restartAttempt()
  }, TestTimeoutDuration)
  setTimeoutFunction(timeout)
}

export const clearTestTimeout = () => {
  clearTimeout(timeoutFunction?.())
}
