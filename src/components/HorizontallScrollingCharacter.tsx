import { Component, createEffect } from 'solid-js'
import { Character } from './Character'
import { userOptions } from '../StateManager'

interface Props {
  expected: string
  actual?: string
  isNext: boolean
  isCurrent: boolean
  translate: (x: number) => void
}

export const HorizontallyScrollingCharacter: Component<Props> = (props) => {
  let element: HTMLSpanElement | undefined

  const scrollToCharacter = () => {
    if (!element) return
    const { left } = element.getBoundingClientRect()
    props.translate(left)
  }

  createEffect(() => {
    if (userOptions.scrollOnWordEnd) {
      if (props.isCurrent && element && props.expected === ' ') {
        scrollToCharacter()
      }
    } else {
      if (props.isNext && element) {
        scrollToCharacter()
      }
    }
  })

  return (
    <Character
      expected={props.expected}
      actual={props.actual}
      isNext={props.isNext}
      ref={element}
    />
  )
}
