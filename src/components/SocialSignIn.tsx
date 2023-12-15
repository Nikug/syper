import { Component } from 'solid-js'
import { Button } from './Button'
import { signInWithProvider } from '../authentication/Supabase'
import { isCurrentThemeDark } from '../themes/ThemeManager'

export const SocialSignIn: Component = () => {
  const handleGoogleSignIn = async () => {
    await signInWithProvider('google')
  }

  const handleDiscordSignIn = async () => {
    await signInWithProvider('discord')
  }

  return (
    <div class="max-w-sm">
      <h3 class="text-xl font-bold mb-8">Sign in with a provider</h3>
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
        <img
          src={
            isCurrentThemeDark()
              ? '/src/assets/Google sign in dark.png'
              : '/src/assets/Google sign in.png'
          }
          class="w-52 cursor-pointer"
          onClick={handleGoogleSignIn}
        />
      </div>
    </div>
  )
}
