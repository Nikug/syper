import { clsx } from 'clsx'
import { CharacterMode } from '../types'

const defaultClasses = `
  whitespace-pre
  text-5xl
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

export const Character = (props: Props) => {
  const characterMode = () => {
    if (props.actual == null) return 'default'
    return props.actual === props.expected ? 'correct' : 'incorrect'
  }

  return (
    <span
      class={clsx(characterClasses[characterMode()], defaultClasses, props.isNext && 'underline')}
    >
      {props.expected}
    </span>
  )
}
