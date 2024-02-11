import { Component, For } from 'solid-js'
import { addNotification, notifications } from '../NotificationsHandler'
import { Notification } from './Notification'

export const Notifications: Component = () => {
  const createNotification = () => {
    addNotification({
      type: 'error',
      content: 'This is a notification',
    })
  }

  return (
    <div class="fixed top-24 right-8 w-72 flex flex-col justify-start items-start gap-4">
      <For each={notifications.notifications}>
        {(notification) => <Notification notification={notification} />}
      </For>
      <button onClick={() => createNotification()}>Add</button>
    </div>
  )
}
