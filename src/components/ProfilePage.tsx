import { Component, Show } from 'solid-js'
import { getUserName, isSignedIn, signOut } from '../authentication/Supabase'
import { Button } from './Button'
import { Header } from './Header'
import { HistoricalStatisticsContainer } from './HistoricalStatisticsContainer'
import { SignIn } from './SignIn'
import { handleTeardownAfterSignOut } from '../helpers/stateHelpers'
import { SocialSignIn } from './SocialSignIn'
import { Meta, Title } from '@solidjs/meta'
import { HistoricalPersonalBests } from './HistoricalPersonalBests'

const ProfilePage: Component = () => {
  const handleSignOut = () => {
    signOut()
    handleTeardownAfterSignOut()
  }

  return (
    <>
      <Title>Syper / Profile</Title>
      <Meta
        name="description"
        content="Sign in to save your results. View how many typing tests you have completed and how your typing speed has changed over time."
      />
      <div class="max-w-7xl px-16 mx-auto mb-32">
        <Header />
        <div class="mt-16">
          <Show when={!isSignedIn()}>
            <div class="mb-8 bg-theme-surface0 rounded-lg p-8 flex justify-center gap-16">
              <SignIn />
              <SocialSignIn />
            </div>
          </Show>
          <Show when={isSignedIn()}>
            <div class="mb-8 bg-theme-surface0 p-8 rounded-lg">
              <h3 class="h3">Signed in: {getUserName()}</h3>
              <Button onClick={handleSignOut} text="Sign out" />
            </div>
          </Show>
          <Show when={isSignedIn()}>
            <HistoricalStatisticsContainer />
            <HistoricalPersonalBests />
          </Show>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
