import { Component, Show } from 'solid-js'
import { userOptions } from '../StateManager'
import { isCapsLockOn } from '../handlers/CapsLockHandler'

const classes = `
  font-bold
  text-xl
  bg-theme-primary
  text-theme-base
  rounded
  px-4
  py-2
`

export const CapsLockIndicator: Component = () => {
  return (
    <Show when={isCapsLockOn() && userOptions.showCapsLockIndicator}>
      <div class={classes}>Caps lock on</div>
    </Show>
  )
}
