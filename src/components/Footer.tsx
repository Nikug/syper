import { Component, Show } from 'solid-js'
import { A } from '@solidjs/router'
import { isSignedIn } from '../authentication/Supabase'
import { Routes, isAboutPage, isProfilePage, isTestPage } from '../helpers/routeHelpers'
import clsx from 'clsx'

const buttonClasses = `
  flex
  items-center
  px-2
  border-button
`

const activeClasses = `
  text-theme-primary
`

export const Footer: Component = () => {
  return (
    <div class="fixed h-10 inset-x-0 bottom-0 bg-theme-base flex justify-center items-center">
      <div class="max-w-7xl w-7xl px-16 flex justify-center items-center text-lg">
        <A href={Routes.test} class={clsx(buttonClasses, { [activeClasses]: isTestPage() })}>
          <div class="i-ri-keyboard-box-line w-6 h-6 mr-2" />
          Test
        </A>
        /
        <A href={Routes.profile} class={clsx(buttonClasses, { [activeClasses]: isProfilePage() })}>
          <div class="i-ri-user-line w-6 h-6 mr-2" />
          <Show when={isSignedIn()} fallback="Sign in">
            Profile
          </Show>
        </A>
        /
        <A href={Routes.about} class={clsx(buttonClasses, { [activeClasses]: isAboutPage() })}>
          <div class="i-ri-question-line w-6 h-6 mr-2" />
          About
        </A>
      </div>
    </div>
  )
}
