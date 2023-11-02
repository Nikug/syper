import clsx from 'clsx'
import { Component, JSX, splitProps } from 'solid-js'

type Props = JSX.InputHTMLAttributes<HTMLInputElement>

const classes = `
  appearance-none
  bg-theme-base
  rounded
  accent-theme-primary
  caret-theme-primary
  h-8
  px-2
`

export const Input: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ['class', 'type'])

  return <input class={clsx(local.class, classes)} type={local.type ?? 'text'} {...others} />
}
