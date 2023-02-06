import { clsx } from 'clsx'
import { createEffect, createMemo } from 'solid-js'

interface Props {
  expected: string
  actual?: string
}

export const Character = (props: Props) => {
  const isIncorrect = createMemo(() => props.actual != null && props.expected !== props.actual)

  createEffect(() => {
    console.log(isIncorrect())
  })

  return <div class={clsx(isIncorrect() && 'text-red-500', 'whitespace-pre')}>{props.expected}</div>
}
