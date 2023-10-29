import clsx from 'clsx'
import { Component, JSX, Show, splitProps } from 'solid-js'

interface Props extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onClick'> {
  onClick?(value: boolean): void
  text?: string
  value?: boolean
}

export const CheckButton: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ['onClick', 'text', 'class', 'value'])

  return (
    <button
      class={clsx(buttonClasses(local.value), local.class)}
      onClick={() => local.onClick?.(!local.value)}
      {...others}
    >
      <Show when={local.value}>
        <div class="i-ri-check-line w-6 h-6 mr-2" />
      </Show>
      {local.text}
    </button>
  )
}

const buttonClasses = (checked: boolean | undefined) => `
  flex
  items-center
  border
  border-2
  rounded
  ${checked ? 'border-theme-primary' : 'border-theme-danger'}
  ${checked ? 'text-theme-primary' : 'text-theme-danger'}
  hover:border-theme-highlight
  hover:text-theme-highlight
  hover:bg-theme-highlight/10
  font-bold
  px-4 py-2
`
