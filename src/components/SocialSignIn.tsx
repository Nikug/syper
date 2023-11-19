import { Component } from 'solid-js'
import { Button } from './Button'
import { signInWithProvider } from '../authentication/Supabase'

export const SocialSignIn: Component = () => {
  const handleGoogleSignIn = async () => {
    await signInWithProvider('google')
  }

  const handleDiscordSignIn = async () => {
    await signInWithProvider('discord')
  }

  return (
    <div class="max-w-sm">
      <h3 class="text-xl font-bold mb-8">Sign in with provider</h3>
      <div class="flex flex-col gap-8">
        <Button class="w-full" onClick={handleGoogleSignIn} text="Sign in with Google" />
        <Button class="w-full" onClick={handleDiscordSignIn} text="Sign in with Discord" />
      </div>
    </div>
  )
}
