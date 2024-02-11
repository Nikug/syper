import { JSXElement, createSignal } from 'solid-js'
import { produce, createStore } from 'solid-js/store'

interface NotificationStore {
  notifications: Notification[]
}

export type NotificationType = 'info' | 'warn' | 'error'

export interface CreateNotification {
  type: NotificationType
  content: JSXElement
  duration?: number
}

export interface Notification extends CreateNotification {
  id: number
  timeout?: NodeJS.Timeout
}

export const [notifications, setNotifications] = createStore<NotificationStore>({
  notifications: [],
})
const [id, setId] = createSignal<number>(0)

const getId = () => {
  const newId = id()
  setId(id() + 1)
  return newId
}

export const addNotification = (notification: CreateNotification) => {
  const fullNotification: Notification = { id: getId(), ...notification }

  if (notification.duration) {
    const timeout = setTimeout(() => removeNotification(fullNotification.id), notification.duration)
    fullNotification.timeout = timeout
  }

  setNotifications(
    produce((current) => {
      current.notifications.push(fullNotification)
    })
  )
}

export const removeNotification = (id: number) => {
  setNotifications(
    produce((current) => {
      const index = current.notifications.findIndex((notification) => notification.id === id)

      if (index < 0) {
        return current
      }

      clearTimeout(current.notifications[index].timeout)

      current.notifications.splice(index, 1)
    })
  )
}
