import { Component, onMount } from 'solid-js'
import { LoadingScreen } from './LoadingScreen'
import { getLocallyStoredOptions, persistUserOptions } from '../helpers/optionsHelpers'
import { setUserOptions } from '../StateManager'
import { Routes } from '../helpers/routeHelpers'
import { setupAuth } from '../authentication/Supabase'

const SignupPage: Component = () => {
  onMount(async () => {
    const options = getLocallyStoredOptions()
    setUserOptions(options)
    await setupAuth()
    await persistUserOptions()

    window.location.replace(Routes.profile)
  })

  return <LoadingScreen />
}

export default SignupPage
