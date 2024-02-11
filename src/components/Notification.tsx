import { Component, Show } from 'solid-js'
import { Notification as NotificationType, removeNotification } from '../NotificationsHandler'

interface Props {
  notification: NotificationType
}

export const Notification: Component<Props> = (props) => {
  const closeNotification = () => {
    removeNotification(props.notification.id)
  }

  return (
    <div class="paper p-4 w-full relative">
      <div class="absolute top-1 right-1">
        <div class="i-ri-close-line h-6 w-6 cursor-pointer" onClick={() => closeNotification()} />
      </div>
      <Show when={props.notification.type === 'error'}>
        <div class="flex items-center gap-2 mb-4 text-theme-danger">
          <div class="i-ri-error-warning-line h-6 w-6" />
          <p>Error</p>
        </div>
      </Show>
      <Show when={props.notification.type === 'warn'}>
        <div class="flex items-center gap-2 mb-4 text-theme-danger">
          <div class="i-ri-error-warning-line h-6 w-6" />
          <p>Warning</p>
        </div>
      </Show>
      <Show when={props.notification.type === 'info'}>
        <div class="flex items-center gap-2 mb-4">
          <div class="i-ri-question-line h-6 w-6" />
          <p>Information</p>
        </div>
      </Show>
      {props.notification.content}
    </div>
  )
}
