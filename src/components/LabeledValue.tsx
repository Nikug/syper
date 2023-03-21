import { Component, JSX } from 'solid-js'

interface Props {
  value: string | number | JSX.Element | undefined | null
  label: string | undefined | null
}

export const LabeledValue: Component<Props> = (props) => {
  return (
    <div class="text-center">
      <p class="font-bold text-4xl">{props.value}</p>
      <p class="text-lg">{props.label}</p>
    </div>
  )
}
