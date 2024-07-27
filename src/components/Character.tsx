import { clsx } from 'clsx'

import { Component, createEffect } from 'solid-js'
import { CharacterMode } from '../types'
import { userOptions } from '../StateManager'
import { testStarted } from '../helpers/stateHelpers'

const defaultClasses = `
  whitespace-pre
  decoration-3
  scroll-my-16
`

const characterClasses: Record<CharacterMode, string> = {
  default: 'text-theme-text decoration-theme-primary',
  correct: 'text-theme-primary',
  incorrect: 'text-theme-danger underline decoration-theme-danger',
}

const highlightClasses: Record<CharacterMode, string> = {
  default: '',
  correct: 'bg-theme-primary/10',
  incorrect: 'bg-theme-danger/40',
}

interface Props {
  expected: string
  actual?: string
  isNext: boolean
  targetHeight: number
  translate: (amount: number) => void
}

export const Character: Component<Props> = (props) => {
  let element: HTMLSpanElement | undefined

  const characterMode = () => {
    if (props.actual == null) return 'default'
    return props.actual === props.expected ? 'correct' : 'incorrect'
  }

  const getParent = () => element?.parentElement

  createEffect(() => {
    if (props.isNext && element && props.translate) {
      const parent = getParent()
      if (!parent) return

      const { top, height } = parent.getBoundingClientRect()
      const amount = props.targetHeight - top - height / 2
      if (amount !== 0) {
        props.translate(amount)
      }
    }
  })

  return (
    <span
      ref={element}
      style={{ 'font-size': `${userOptions.fontSize}px` }}
      class={clsx(
        characterClasses[characterMode()],
        userOptions.showTextHighlight && highlightClasses[characterMode()],
        defaultClasses,
        props.isNext && 'underline',
        props.isNext && !testStarted() && 'blink'
      )}
    >
      {props.expected}
    </span>
  )
}
