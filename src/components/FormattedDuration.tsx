import { Component, Show } from 'solid-js'

interface Props {
  duration: number
}

export const FormattedDuration: Component<Props> = (props) => {
  const totalSeconds = () => props.duration / 1000
  const minutes = () => Math.floor(totalSeconds() / 60)
  const remainingSeconds = () => totalSeconds() % 60

  return (
    <span>
      <Show when={minutes()}>
        {minutes()}
        <span class="font-normal text-lg mr-2">m</span>
      </Show>
      {remainingSeconds().toFixed(1)}
      <span class="font-normal text-lg">s</span>
    </span>
  )
}
