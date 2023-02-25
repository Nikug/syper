import { Component } from 'solid-js'

interface Props {
  onClick?(event: MouseEvent): void
  text?: string
}

export const Button: Component<Props> = (props) => {
  return <button onClick={(event) => props.onClick?.(event)}>{props.text}</button>
}
