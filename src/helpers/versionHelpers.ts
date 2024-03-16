import { addNotification } from '../NotificationsHandler'
import { getLatestVersion } from '../api/releases'

export const handleVersionCheck = async () => {
  const version = import.meta.env.VITE_APP_VERSION
  if (!version) {
    return
  }

  console.log('App version:', version)

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
}
