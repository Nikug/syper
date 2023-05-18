import { Component, Show } from 'solid-js'
import { getUserName, isSignedIn, signIn, signOut } from '../authentication/Authentication'
import { Button } from './Button'
import { Header } from './Header'
import { HistoricalStatisticsContainer } from './HistoricalStatisticsContainer'

const ProfilePage: Component = () => {
  return (
    <div class="max-w-7xl px-16 mx-auto">
      <Header />
      <div class="mt-16">
        <Show when={!isSignedIn()}>
          <h3 class="text-xl font-bold mb-8">Sign in to save your results</h3>
          <Button onClick={() => signIn()} text="Sign in" />
        </Show>
        <Show when={isSignedIn()}>
          <h3 class="text-xl font-bold mb-8">Signed in: {getUserName()}</h3>
          <Button onClick={() => signOut()} text="Sign out" />
          <HistoricalStatisticsContainer />
        </Show>
      </div>
    </div>
  )
}

export default ProfilePage
