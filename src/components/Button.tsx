import clsx from 'clsx'
import { Component, JSX, splitProps } from 'solid-js'

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?(event: MouseEvent): void
  text?: string
}

export const Button: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ['onClick', 'text', 'class'])

  return (
    <button
      class={clsx(buttonClasses, local.class)}
      onClick={(event) => local.onClick?.(event)}
      {...others}
    >
      {local.text}
    </button>
  )
}

const buttonClasses = `
  border
  border-2
  rounded
  border-ctp-mauve
  text-ctp-mauve
  hover:border-ctp-maroon
  hover:text-ctp-maroon
  hover:bg-ctp-maroon/10
  font-bold
  px-4 py-2
`
