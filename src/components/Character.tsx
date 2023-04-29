import { clsx } from 'clsx'
import { Component, createEffect } from 'solid-js'
import { CharacterMode } from '../types'

const defaultClasses = `
  whitespace-pre
  text-4xl
  scroll-mb-12
`

const characterClasses: Record<CharacterMode, string> = {
  default: 'text-theme-text decoration-theme-primary decoration-3',
  correct: 'text-theme-primary bg-theme-primary/10',
  incorrect: 'text-theme-danger bg-theme-danger/40',
}

interface Props {
  expected: string
  actual?: string
  isNext: boolean
}

export const Character: Component<Props> = (props) => {
  let element: HTMLSpanElement | undefined
  const characterMode = () => {
    if (props.actual == null) return 'default'
    return props.actual === props.expected ? 'correct' : 'incorrect'
  }

  createEffect(() => {
    if (props.isNext && element) {
      element.scrollIntoView(false)
    }
  })

  return (
    <span
      ref={element}
      class={clsx(characterClasses[characterMode()], defaultClasses, props.isNext && 'underline')}
    >
      {props.expected}
    </span>
  )
}
