import { Component, onCleanup, onMount, lazy, createSignal, Show } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
import { setupAuth } from './authentication/Authentication'
import { cleanupKeyboard, setupKeyboard } from './KeyboardHandler'
import { getStoredUserOptions, setUserOptions } from './OptionsManager'
import { setTypingTest } from './StateManager'
import { initializeText } from './helpers/stateHelpers'
import { SyncingIndicator } from './components/SyncingIndicator'
import { LoadingScreen } from './components/LoadingScreen'

const TestPage = lazy(() => import('./components/TestPage'))
const ProfilePage = lazy(() => import('./components/ProfilePage'))

const App: Component = () => {
  const [loading, setLoading] = createSignal(false)

  onMount(async () => {
    // Setup user options from local storage
    setUserOptions(await getStoredUserOptions())
    setLoading(true)
    await setupAuth()

    // Setup user options from Azure if logged in
    setUserOptions(await getStoredUserOptions())
    setupKeyboard()
    setTypingTest(await initializeText())
    setLoading(false)
  })

  onCleanup(() => cleanupKeyboard())

  return (
    <div class="w-screen font-sans overflow-x-hidden min-h-screen bg-theme-base text-theme-text">
      <SyncingIndicator />
      <Show when={!loading()} fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" component={TestPage} />
          <Route path="/profile" component={ProfilePage} />
        </Routes>
      </Show>
    </div>
  )
}

export default App
