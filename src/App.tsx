import { Component, lazy } from 'solid-js'
import { Router, Route } from '@solidjs/router'
import { Routes as AppRoutes } from './helpers/routeHelpers'
import MainLayout from './MainLayout'

const TestPage = lazy(() => import('./components/TestPage'))
const OptionsPage = lazy(() => import('./components/OptionsPage'))
const ProfilePage = lazy(() => import('./components/ProfilePage'))
const AboutPage = lazy(() => import('./components/about/AboutPage'))
const PrivacyPage = lazy(() => import('./components/PrivacyPage'))
const SignupPage = lazy(() => import('./components/SignupPage'))

const App: Component = () => {
  return (
    <Router root={MainLayout}>
      <Route path={AppRoutes.test} component={TestPage} />
      <Route path={AppRoutes.options} component={OptionsPage} />
      <Route path={AppRoutes.profile} component={ProfilePage} />
      <Route path={AppRoutes.about} component={AboutPage} />
      <Route path={AppRoutes.privacy} component={PrivacyPage} />
      <Route path={AppRoutes.signup} component={SignupPage} />
    </Router>
  )
}

export default App
