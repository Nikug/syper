import { Component, onMount, lazy, Show } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
import { setupAuth } from './authentication/Supabase'
import { setUserOptions } from './StateManager'
import { SyncingIndicator } from './components/SyncingIndicator'
import { LoadingScreen } from './components/LoadingScreen'
import { setShowLoadingScreen, showLoadingScreen } from './SyncingManager'
import { getStoredUserOptions } from './helpers/optionsHelpers'
import { handleInitialSetupAfterSignIn } from './helpers/stateHelpers'
import { Footer } from './components/Footer'
import { Routes as AppRoutes } from './helpers/routeHelpers'
import { BlurWhenTyping } from './components/BlurWhenTyping'

const TestPage = lazy(() => import('./components/TestPage'))
const OptionsPage = lazy(() => import('./components/OptionsPage'))
const ProfilePage = lazy(() => import('./components/ProfilePage'))
const AboutPage = lazy(() => import('./components/AboutPage'))
const PrivacyPage = lazy(() => import('./components/PrivacyPage'))

const App: Component = () => {
  onMount(async () => {
    // Setup user options from local storage
    setUserOptions(await getStoredUserOptions())
    setShowLoadingScreen(true)
    await setupAuth()

    // Setup user options from Supabase if logged in
    await handleInitialSetupAfterSignIn()
    setShowLoadingScreen(false)
  })

  return (
    <div class="relative w-full font-sans overflow-x-hidden min-h-screen bg-theme-base text-theme-text">
      <SyncingIndicator />
      <Show when={!showLoadingScreen()} fallback={<LoadingScreen />}>
        <Routes>
          <Route path={AppRoutes.test} component={TestPage} />
          <Route path={AppRoutes.options} component={OptionsPage} />
          <Route path={AppRoutes.profile} component={ProfilePage} />
          <Route path={AppRoutes.about} component={AboutPage} />
          <Route path={AppRoutes.privacy} component={PrivacyPage} />
        </Routes>
      </Show>
      <BlurWhenTyping>
        <Footer />
      </BlurWhenTyping>
    </div>
  )
}

export default App
