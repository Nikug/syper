import { Component, Show } from 'solid-js'
import { A } from '@solidjs/router'
import { isSignedIn } from '../authentication/Supabase'

const buttonClasses = `
  flex
  items-center
  px-2
  border-button
`

export const Footer: Component = () => {
  return (
    <div class="fixed h-10 inset-x-0 bottom-0 bg-theme-base flex justify-center items-center">
      <div class="flex justify-center items-center text-lg">
        <A href="/" class={buttonClasses}>
          <div class="i-ri-keyboard-box-line w-6 h-6 mr-2" />
          Test
        </A>
        /
        <A href="/profile" class={buttonClasses}>
          <div class="i-ri-user-line w-6 h-6 mr-2" />
          <Show when={isSignedIn()} fallback="Sign in">
            Profile
          </Show>
        </A>
      </div>
    </div>
  )
}
