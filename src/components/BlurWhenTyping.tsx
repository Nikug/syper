import { Component, JSX } from 'solid-js'
import { attempt } from '../StateManager'
import { AttemptStates } from '../types'
import clsx from 'clsx'

interface Props {
  children: JSX.Element
}

export const BlurWhenTyping: Component<Props> = (props) => {
  const isOngoingAttempt = () => attempt.state === AttemptStates.started

  return (
    <div
      class={clsx({
        blurred: isOngoingAttempt(),
        'not-blurred': !isOngoingAttempt(),
      })}
    >
      {props.children}
    </div>
  )
}
