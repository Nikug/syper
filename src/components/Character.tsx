import { clsx } from 'clsx'
import { Component, createEffect } from 'solid-js'
import { CharacterMode } from '../types'

const defaultClasses = `
  whitespace-pre
  text-4xl
  scroll-mt-10
`

const characterClasses: Record<CharacterMode, string> = {
  default: 'text-ctp-text decoration-ctp-yellow',
  correct: 'text-ctp-yellow bg-ctp-surface-2',
  incorrect: 'text-ctp-red bg-ctp-peach',
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
      element.scrollIntoView()
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
