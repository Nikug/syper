import { clsx } from 'clsx'
import { Component } from 'solid-js'
import { Key } from './Key'

export const NavigationHelp: Component = () => {
  return (
    <div class={clsx('flex justify-center')}>
      <div class="flex mt-4 mb-4 text-sm items-center">
        <p class="mr-2">Next:</p>
        <Key keyname="Tab" />
        <p class="ml-4 mr-2"> Restart:</p> <Key keyname="Esc" />
      </div>
    </div>
  )
}
