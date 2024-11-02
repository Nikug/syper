import { Component, createEffect } from 'solid-js'
import { Character } from './Character'

interface Props {
  expected: string
  actual?: string
  isNext: boolean
  translate: (x: number) => void
}

export const HorizontallyScrollingCharacter: Component<Props> = (props) => {
  let element: HTMLSpanElement | undefined

  createEffect(() => {
    if (props.isNext && element) {
      const { left } = element.getBoundingClientRect()
      props.translate(left)
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
