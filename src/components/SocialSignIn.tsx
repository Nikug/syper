import { Component } from 'solid-js'
import { Button } from './Button'
import { signInWithProvider } from '../authentication/Supabase'
// import { isCurrentThemeDark } from '../themes/ThemeManager'

export const SocialSignIn: Component = () => {
  const handleGoogleSignIn = async () => {
    await signInWithProvider('google')
  }

  const handleDiscordSignIn = async () => {
    await signInWithProvider('discord')
  }

  return (
    <div class="max-w-sm">
      <h3 class="h3 pb-8">Sign in with a provider</h3>
      <div class="flex flex-col gap-8">
        <Button
          class="w-full"
          onClick={handleDiscordSignIn}
          text={
            <div class="flex gap-4 items-center">
              <div class="i-ri-discord-fill h-5 w-5" />
              Sign in with Discord
            </div>
          }
        />
        <Button
          class="w-full"
          onClick={handleGoogleSignIn}
          text={
            <div class="flex gap-4 items-center">
              <div class="i-ri-google-fill h-5 w-5" />
              Sign in with Google
            </div>
          }
        />
        {/*<img
          src={isCurrentThemeDark() ? '/Google sign in dark.png' : '/Google sign in.png'}
          class="w-52 cursor-pointer"
          onClick={handleGoogleSignIn}
        />*/}
      </div>
    </div>
  )
}
