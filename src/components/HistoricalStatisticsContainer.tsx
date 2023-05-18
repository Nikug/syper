import { endOfDay, formatDuration, startOfDay, subDays } from 'date-fns'
import { Component, createMemo, createResource, createSignal, onMount, Show } from 'solid-js'
import { getTestResults } from '../api/testResults'
import { getFormattedDuration } from '../helpers/mathHelpers'
import { TestResultSum } from '../types'
import { HistoryChart } from './HistoryChart'
import { LabeledValue } from './LabeledValue'

interface Dates {
  startDate: Date
  endDate: Date
}

export const HistoricalStatisticsContainer: Component = () => {
  const [dates, setDates] = createSignal<Dates | null>(null)
  const [testResults] = createResource(dates, (dates) =>
    getTestResults(dates?.startDate, dates?.endDate)
  )

  onMount(() => {
    const endDate = endOfDay(new Date())
    const startDate = startOfDay(subDays(endDate, 10))
    setDates({ startDate, endDate })
  })

  const summedResult = createMemo<TestResultSum>(() => {
    const tests = testResults()
    const emptySum = {
      tests: 0,
      characters: 0,
      words: 0,
      duration: 0,
      wordsPerMinute: 0,
      accuracy: 0,
      correctness: 0,
    }

    if (!tests) return emptySum

    const sum = tests.reduce((combined: TestResultSum, test) => {
      combined.tests++
      combined.characters += test.characters
      combined.words += test.words
      combined.duration += test.duration
      combined.wordsPerMinute += test.wordsPerMinute
      combined.accuracy += test.accuracy
      combined.correctness += test.correctness
      return combined
    }, emptySum)

    sum.wordsPerMinute = sum.wordsPerMinute / (sum.tests || 1)
    sum.accuracy = sum.accuracy / (sum.tests || 1)
    sum.correctness = sum.correctness / (sum.tests || 1)

    return sum
  })

  return (
    <div class="w-full mt-16 mb-32">
      <h3 class="text-3xl font-bold text-center mb-8">History (last 10 days)</h3>
      <div class="w-full flex justify-center mb-8 gap-16">
        <LabeledValue value={summedResult().tests} label="Completed tests" />
        <LabeledValue value={summedResult().characters} label="Total characters" />
        <LabeledValue value={summedResult().words} label="Total words" />
        <LabeledValue
          value={getFormattedDuration(summedResult().duration)}
          label="Total duration"
        />
      </div>
      <div class="w-full flex justify-center mb-8 gap-16">
        <LabeledValue value={summedResult().wordsPerMinute.toFixed(2)} label="Average Wpm" />
        <LabeledValue
          value={`${(summedResult().accuracy * 100).toFixed(2)}%`}
          label="Average Accuracy"
        />
        <LabeledValue
          value={`${(summedResult().correctness * 100).toFixed(2)}%`}
          label="Average Correctness"
        />
      </div>
      <Show when={!testResults.loading} fallback={'Loading'}>
        <HistoryChart tests={testResults() ?? []} />
      </Show>
    </div>
  )
}
