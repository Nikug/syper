import { Component, createEffect, onCleanup, onMount, lazy } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
import { setupAuth } from './authentication/Authentication'
import { cleanupKeyboard, setupKeyboard } from './KeyboardHandler'
import { persistUserOptions, userOptions } from './OptionsManager'
import { setTypingTest } from './StateManager'
import { initializeText } from './helpers/stateHelpers'

const TestPage = lazy(() => import('./components/TestPage'))
const ProfilePage = lazy(() => import('./components/ProfilePage'))

const App: Component = () => {
  onMount(async () => {
    setupAuth()
    setupKeyboard()
    setTypingTest(await initializeText())
  })
  onCleanup(() => cleanupKeyboard())

  createEffect(() => {
    document.body.className = `ctp-${userOptions.theme}`
  })

  createEffect(() => {
    persistUserOptions()
  })

  return (
    <div class="w-screen overflow-x-hidden min-h-screen bg-ctp-base text-ctp-text">
      <Routes>
        <Route path="/" component={TestPage} />
        <Route path="/profile" component={ProfilePage} />
      </Routes>
    </div>
  )
}

export default App
