import { Component, Show } from 'solid-js'
import { isCapsLockOn } from '../StateManager'

const classes = `
  font-bold
  text-xl
  bg-theme-text
  text-theme-base
  rounded
  px-4
  py-2
`

export const CapslockIndicator: Component = () => {
  return (
    <Show when={isCapsLockOn()}>
      <div class={classes}>Caps lock on</div>
    </Show>
  )
}
