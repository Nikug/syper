import { Component, onMount, lazy, Show } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
import { setupAuth } from './authentication/Supabase'
import { setUserOptions } from './StateManager'
import { SyncingIndicator } from './components/SyncingIndicator'
import { LoadingScreen } from './components/LoadingScreen'
import { setShowLoadingScreen, showLoadingScreen } from './SyncingManager'
import { getStoredUserOptions } from './helpers/optionsHelpers'

const TestPage = lazy(() => import('./components/TestPage'))
const ProfilePage = lazy(() => import('./components/ProfilePage'))

const App: Component = () => {
  onMount(async () => {
    // Setup user options from local storage
    setUserOptions(await getStoredUserOptions())
    setShowLoadingScreen(true)
    await setupAuth()

    // Setup user options from Azure if logged in
    setUserOptions(await getStoredUserOptions())
    setShowLoadingScreen(false)
  })

  return (
    <div class="w-screen font-sans overflow-x-hidden min-h-screen bg-theme-base text-theme-text">
      <SyncingIndicator />
      <Show when={!showLoadingScreen()} fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" component={TestPage} />
          <Route path="/profile" component={ProfilePage} />
        </Routes>
      </Show>
    </div>
  )
}

export default App
