import { Component, Show } from 'solid-js'
import { isSyncing } from '../SyncingManager'

export const SyncingIndicator: Component = () => {
  return (
    <Show when={isSyncing()}>
      <div class="fixed top-8 right-8 flex items-center opacity-50">
        <p>Syncing</p>
        <div class="relative h-5 w-5 ml-1 animate-spin">
          {/* Firefox has weird bug with spinning css icons, so use svg instead */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364Z"
            />
          </svg>
        </div>
      </div>
    </Show>
  )
}
