import { addNotification } from '../NotificationsHandler'
import { getLatestCommit } from '../api/github'

export const handleVersionCheck = async () => {
  const version = import.meta.env.VITE_APP_VERSION
  if (!version) {
    return
  }

  console.log('App version:', version)

  const currentVersion = await getLatestCommit()
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
