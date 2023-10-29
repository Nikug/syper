import { Component, Show } from 'solid-js'
import { getUserName, isSignedIn, signOut } from '../authentication/Supabase'
import { Button } from './Button'
import { Header } from './Header'
import { HistoricalStatisticsContainer } from './HistoricalStatisticsContainer'
import { SignIn } from './SignIn'
import { handleTeardownAfterSignOut } from '../helpers/stateHelpers'
import { UserOptions } from './UserOptions'

const ProfilePage: Component = () => {
  const handleSignOut = () => {
    signOut()
    handleTeardownAfterSignOut()
  }

  return (
    <div class="max-w-7xl px-16 mx-auto">
      <Header />
      <div class="mt-16">
        <Show when={!isSignedIn()}>
          <div class="mb-8">
            <SignIn />
          </div>
        </Show>
        <Show when={isSignedIn()}>
          <div class="mb-8 bg-theme-surface0 p-8 rounded-lg">
            <h3 class="text-xl font-bold mb-4">Signed in: {getUserName()}</h3>
            <Button onClick={handleSignOut} text="Sign out" />
          </div>
        </Show>
        <div class="mb-8 bg-theme-surface0 p-8 rounded-lg">
          <h3 class="text-xl font-bold mb-4">User options</h3>
          <UserOptions />
        </div>
        <Show when={isSignedIn()}>
          <div>
            <HistoricalStatisticsContainer />
          </div>
        </Show>
      </div>
    </div>
  )
}

export default ProfilePage
