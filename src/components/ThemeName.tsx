import { Component, Show } from 'solid-js'
import { ThemeVariables } from '../themes/themes'

interface Props {
  theme: ThemeVariables
}

export const ThemeName: Component<Props> = (props) => {
  return (
    <div class="flex items-center">
      <Show when={props.theme.dark} fallback={<div class="i-ri-sun-line" />}>
        <div class="i-ri-moon-line" />
      </Show>
      <p class="ml-2">{props.theme.name}</p>
    </div>
  )
}
