import { Component, onMount, Show, onCleanup, JSX } from 'solid-js'
import { setupAuth } from './authentication/Supabase'
import { setUserOptions } from './StateManager'
import { SyncingIndicator } from './components/SyncingIndicator'
import { LoadingScreen } from './components/LoadingScreen'
import { setShowLoadingScreen, showLoadingScreen } from './SyncingManager'
import { getStoredUserOptions } from './helpers/optionsHelpers'
import { handleInitialSetupAfterSignIn } from './helpers/stateHelpers'
import { Footer } from './components/Footer'
import { isSignupPage } from './helpers/routeHelpers'
import { BlurWhenTyping } from './components/BlurWhenTyping'
import { Title } from '@solidjs/meta'
import { Notifications } from './components/Notifications'
import {
  initialVersionCheck,
  setupVersionCheck,
  teardownVersionCheck,
} from './helpers/versionHelpers'

interface Props {
  children?: JSX.Element
}

const App: Component<Props> = (props) => {
  onMount(async () => {
    if (isSignupPage()) return

    // Setup user options from local storage
    setUserOptions(await getStoredUserOptions())
    setShowLoadingScreen(true)
    await setupAuth()

    // Setup user options from Supabase if logged in
    await handleInitialSetupAfterSignIn()
    setShowLoadingScreen(false)

    // Check if version is outdated on window focus
    initialVersionCheck()
    setupVersionCheck()
  })

  onCleanup(() => {
    teardownVersionCheck()
  })

  return (
    <>
      <Title>Syper_</Title>
      <div class="relative w-screen font-sans overflow-x-hidden min-h-screen bg-theme-base text-theme-text">
        <SyncingIndicator />
        <Notifications />
        <Show when={!showLoadingScreen()} fallback={<LoadingScreen />}>
          {props.children}
        </Show>
        <Show when={!showLoadingScreen()}>
          <BlurWhenTyping>
            <Footer />
          </BlurWhenTyping>
        </Show>
      </div>
    </>
  )
}

export default App
