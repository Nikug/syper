import { addNotification } from '../NotificationsHandler'
import { getLatestVersion } from '../api/releases'

export const setupVersionCheck = () => {
  addEventListener('focus', handleVersionCheck)
}

export const teardownVersionCheck = () => {
  removeEventListener('focus', handleVersionCheck)
}

export const initialVersionCheck = async () => {
  const version = await handleVersionCheck()
  if (version) {
    console.log('App version:', version)
  }
}

const handleVersionCheck = async () => {
  const version = import.meta.env.VITE_APP_VERSION
  if (!version) {
    return
  }

  const currentVersion = await getLatestVersion()
  if (!currentVersion) {
    return
  }

  if (currentVersion !== version) {
    addNotification({
      type: 'info',
      content: 'A new version is available. Please reload the page.',
    })
  }

  return version
}
