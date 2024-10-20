import { Component, onMount } from 'solid-js'
import { LoadingScreen } from './LoadingScreen'
import { getLocallyStoredOptions, persistUserOptions } from '../helpers/optionsHelpers'
import { setUserOptions } from '../StateManager'
import { Routes } from '../helpers/routeHelpers'
import { setupAuth } from '../authentication/Supabase'

const SignupPage: Component = () => {
  onMount(async () => {
    await setupAuth()
    const options = getLocallyStoredOptions()
    setUserOptions(options)
    await persistUserOptions()

    window.location.replace(Routes.profile)
  })

  return <LoadingScreen />
}

export default SignupPage
