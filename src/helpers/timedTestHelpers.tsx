import { createSignal, startTransition } from 'solid-js'
import { produce } from 'solid-js/store'
import { fromWritingToResults } from '../AnimationManager'
import { submitTestResult } from '../logic/testResult'
import { attempt, setAttempt, setTypingTest, typingTest, userOptions } from '../StateManager'
import { Attempt } from '../types'
import { handleTestEnd } from './stateHelpers'

const [timer, setTimer] = createSignal<NodeJS.Timer | null>(null)

export const startTimer = () => {
  clearInterval(timer() ?? undefined)
  const interval = setInterval(updateAttempt, 1000)
  setTimer(interval)
}

export const stopTimer = () => {
  clearInterval(timer() ?? undefined)
}

const updateAttempt = () => {
  let isEnd = false
  setAttempt(
    produce((attempt) => {
      const performanceNow = performance.now()
      attempt.remainingDuration =
        (attempt.measurements.startTime ?? 0) + attempt.testDuration - performanceNow

      if (attempt.remainingDuration <= 0) {
        isEnd = true
        attempt = handleTestEnd(attempt, performanceNow)
      }
    })
  )

  if (isEnd) {
    endAttempt(attempt)
  }
}

const endAttempt = (attempt: Attempt) => {
  stopTimer()
  startTransition(fromWritingToResults)
  setTypingTest(
    produce((test) => {
      test.length = attempt.finalText.length
    })
  )
  submitTestResult(attempt, userOptions.textMode, typingTest())
}
