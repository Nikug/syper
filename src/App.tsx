import { Component, onMount, lazy, Show, onCleanup } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
import { setupAuth } from './authentication/Supabase'
import { setUserOptions } from './StateManager'
import { SyncingIndicator } from './components/SyncingIndicator'
import { LoadingScreen } from './components/LoadingScreen'
import { setShowLoadingScreen, showLoadingScreen } from './SyncingManager'
import { getStoredUserOptions } from './helpers/optionsHelpers'
import { handleInitialSetupAfterSignIn } from './helpers/stateHelpers'
import { Footer } from './components/Footer'
import { Routes as AppRoutes, isSignupPage } from './helpers/routeHelpers'
import { BlurWhenTyping } from './components/BlurWhenTyping'
import { Title } from '@solidjs/meta'
import { Notifications } from './components/Notifications'
import {
  initialVersionCheck,
  setupVersionCheck,
  teardownVersionCheck,
} from './helpers/versionHelpers'

const TestPage = lazy(() => import('./components/TestPage'))
const OptionsPage = lazy(() => import('./components/OptionsPage'))
const ProfilePage = lazy(() => import('./components/ProfilePage'))
const AboutPage = lazy(() => import('./components/about/AboutPage'))
const PrivacyPage = lazy(() => import('./components/PrivacyPage'))
const SignupPage = lazy(() => import('./components/SignupPage'))

const App: Component = () => {
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
          <Routes>
            <Route path={AppRoutes.test} component={TestPage} />
            <Route path={AppRoutes.options} component={OptionsPage} />
            <Route path={AppRoutes.profile} component={ProfilePage} />
            <Route path={AppRoutes.about} component={AboutPage} />
            <Route path={AppRoutes.privacy} component={PrivacyPage} />
            <Route path={AppRoutes.signup} component={SignupPage} />
          </Routes>
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
