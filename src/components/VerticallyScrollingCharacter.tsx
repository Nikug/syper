import { Component, createEffect } from 'solid-js'
import { Character } from './Character'

interface Props {
  expected: string
  actual?: string
  isNext: boolean
  targetHeight: number
  translate: (amount: number) => void
}

export const VerticallyScrollingCharacter: Component<Props> = (props) => {
  let element: HTMLSpanElement | undefined

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
    <Character
      expected={props.expected}
      actual={props.actual}
      isNext={props.isNext}
      ref={element}
    />
  )
}
