import { Component } from 'solid-js'

interface Props {
  keyname: string
}

export const Key: Component<Props> = (props) => {
  return (
    <span class="inline-flex px-2 rounded border-2 border-theme-text">
      <p class="font-bold">{props.keyname}</p>
    </span>
  )
}
