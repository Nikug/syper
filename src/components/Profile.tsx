import { Component, Show } from 'solid-js'
import { isSignedIn, signIn, signOut } from '../authentication/Authentication'
import { Button } from './Button'

export const Profile: Component = () => {
  return (
    <div>
      <Show when={isSignedIn()} fallback={<Button onClick={() => signIn()} text="Sign in" />}>
        <Button onClick={() => signOut()} text="Sign out" />
      </Show>
    </div>
  )
}
