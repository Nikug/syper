import { Component, onCleanup, onMount, lazy } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
import { setupAuth } from './authentication/Authentication'
import { cleanupKeyboard, setupKeyboard } from './KeyboardHandler'
import { getStoredUserOptions, setUserOptions } from './OptionsManager'
import { setTypingTest } from './StateManager'
import { initializeText } from './helpers/stateHelpers'

const TestPage = lazy(() => import('./components/TestPage'))
const ProfilePage = lazy(() => import('./components/ProfilePage'))

const App: Component = () => {
  onMount(async () => {
    await setupAuth()
    setUserOptions(await getStoredUserOptions())
    setupKeyboard()
    setTypingTest(await initializeText())
  })
  onCleanup(() => cleanupKeyboard())

  return (
    <div class="w-screen font-sans overflow-x-hidden min-h-screen bg-ctp-base text-ctp-text">
      <Routes>
        <Route path="/" component={TestPage} />
        <Route path="/profile" component={ProfilePage} />
      </Routes>
    </div>
  )
}

export default App
