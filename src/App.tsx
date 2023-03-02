import { Component, createEffect, onCleanup, onMount, on, lazy } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
import { setupAuth } from './authentication/Authentication'
import { cleanupKeyboard, setupKeyboard } from './KeyboardHandler'
import { persistUserOptions, userOptions } from './OptionsManager'
import { animationState, initializeText, setQuote } from './StateManager'

const TestPage = lazy(() => import('./components/TestPage'))
const ProfilePage = lazy(() => import('./components/ProfilePage'))

const App: Component = () => {
  onMount(async () => {
    setupAuth()
    setupKeyboard()
    setQuote(await initializeText())
  })
  onCleanup(() => cleanupKeyboard())

  createEffect(() => {
    document.body.className = `ctp-${userOptions.theme}`
  })

  createEffect(
    on(
      () => userOptions.textMode,
      async () => {
        if (animationState().view === 'writing') {
          setQuote(await initializeText())
        }
      }
    )
  )

  createEffect(() => {
    persistUserOptions()
  })

  return (
    <Routes>
      <Route path="/" component={TestPage} />
      <Route path="/profile" component={ProfilePage} />
    </Routes>
  )
}

export default App
