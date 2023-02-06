import { clsx } from 'clsx'
import { createEffect, createMemo } from 'solid-js'
import { CharacterMode } from '../types'

const defaultClasses = `
  whitespace-pre
  text-3xl
`

const characterClasses: Record<CharacterMode, string> = {
  default: 'text-ctp-text',
  correct: 'text-ctp-yellow bg-ctp-surface-2',
  incorrect: 'text-ctp-red bg-ctp-peach',
}

interface Props {
  expected: string
  actual?: string
}

export const Character = (props: Props) => {
  const characterMode = createMemo((): CharacterMode => {
    if (props.actual == null) return 'default'
    return props.actual === props.expected ? 'correct' : 'incorrect'
  })

  return (
    <span class={clsx(characterClasses[characterMode()], defaultClasses)}>{props.expected}</span>
  )
}
