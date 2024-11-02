import { Component, createEffect } from 'solid-js'
import { Character } from './Character'
import { userOptions } from '../StateManager'

interface Props {
  expected: string
  actual?: string
  isNext: boolean
}

export const HorizontallyScrollingCharacter: Component<Props> = (props) => {
  let element: HTMLSpanElement | undefined

  createEffect(() => {
    if (props.isNext && element) {
      element.scrollIntoView({
        inline: 'center',
        behavior: userOptions.useSmoothScrolling ? 'smooth' : 'instant',
      })
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
