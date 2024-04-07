import { endOfDay, startOfDay, subDays, subYears } from 'date-fns'
import { Component, createMemo, createResource, createSignal, Show } from 'solid-js'
import { getTestResults } from '../api/testResults'
import { getFormattedDuration } from '../helpers/dateHelpers'
import {
  setHistoryDictionaries,
  setHistoryDurations,
  setHistoryMode,
  setHistoryTextModes,
  setHistoryWordCounts,
} from '../helpers/optionsHelpers'
import { userOptions } from '../StateManager'
import { TestResultSum } from '../types'
import { Dropdown } from './Dropdown'
import { HistoryChart } from './HistoryChart'
import { LabeledValue } from './LabeledValue'
import { TimeDurations, WordCounts, textModeOptions } from '../constants'
import { Dictionaries, dictionaries } from '../assets/files'
import { Button } from './Button'

const durations = {
  day: () => ({ startDate: startOfDay(new Date()), endDate: endOfDay(new Date()) }),
  tenDays: () => ({
    startDate: startOfDay(subDays(new Date(), 10)),
    endDate: endOfDay(new Date()),
  }),
  month: () => ({ startDate: startOfDay(subDays(new Date(), 30)), endDate: endOfDay(new Date()) }),
  threeMonths: () => ({
    startDate: startOfDay(subDays(new Date(), 90)),
    endDate: endOfDay(new Date()),
  }),
  year: () => ({ startDate: startOfDay(subYears(new Date(), 1)), endDate: endOfDay(new Date()) }),
} as const

export type HistoryMode = keyof typeof durations

const durationOptions: { key: HistoryMode; value: string }[] = [
  { key: 'day', value: 'This day' },
  { key: 'tenDays', value: '10 days' },
  { key: 'month', value: 'Month' },
  { key: 'threeMonths', value: 'Three months' },
  { key: 'year', value: 'Year' },
]

interface Dates {
  startDate: Date
  endDate: Date
}

export const HistoricalStatisticsContainer: Component = () => {
  const [dates, setDates] = createSignal<Dates>(durations[userOptions.historyMode]())
  const [testResults] = createResource(dates, (dates) =>
    getTestResults(dates.startDate, dates.endDate)
  )

  const getFilteredTestResults = () => {
    let results = testResults()

    if (userOptions.historyTextModes.length) {
      results = results?.filter((test) => userOptions.historyTextModes.includes(test.textMode))
    }

    if (userOptions.historyDictionaries.length) {
      results = results?.filter(
        (test) =>
          test.textMode === 'quote' ||
          userOptions.historyDictionaries.some((dictionary) => dictionary === test.source)
      )
    }

    if (userOptions.historyWordCounts.length) {
      results = results?.filter((test) => userOptions.historyWordCounts.includes(test.words))
    }

    if (userOptions.historyDurations.length) {
      results = results?.filter((test) => userOptions.historyDurations.includes(test.duration))
    }

    return results
  }

  const summedResult = createMemo<TestResultSum>(() => {
    const tests = getFilteredTestResults()
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

  const handleHistorySelect = (duration: HistoryMode) => {
    setHistoryMode(duration)
    setDates(durations[duration]())
  }

  const clearFilters = () => {
    setHistoryWordCounts([])
    setHistoryDurations([])
    setHistoryTextModes([])
    setHistoryDictionaries([])
  }

  return (
    <div class="w-full mt-16 mb-32">
      <h3 class="h3 text-center">History</h3>
      <div class="flex justify-center items-center mb-4 gap-4 flex-wrap">
        /
        <Dropdown
          key={userOptions.historyMode}
          options={durationOptions}
          onSelect={(option) => handleHistorySelect(option.key)}
        />
        /
        <Dropdown
          key={userOptions.historyTextModes}
          options={textModeOptions}
          onMultipleSelect={(options) => setHistoryTextModes(options.map((option) => option.key))}
          placeholder="All modes"
        />
        /
        <Dropdown
          key={userOptions.historyDictionaries}
          options={Object.entries(dictionaries).map(([key, value]) => ({
            key: key as Dictionaries,
            value: value.name,
          }))}
          onMultipleSelect={(options) =>
            setHistoryDictionaries(options.map((option) => option.key))
          }
          placeholder="All dictionaries"
        />
        /
        <Dropdown
          key={userOptions.historyWordCounts}
          options={WordCounts.map((count) => ({ key: count, value: count }))}
          onMultipleSelect={(options) => setHistoryWordCounts(options.map((option) => option.key))}
          placeholder="All word counts"
        />
        /
        <Dropdown
          key={userOptions.historyDurations}
          options={TimeDurations}
          onMultipleSelect={(options) => setHistoryDurations(options.map((option) => option.key))}
          placeholder="All durations"
        />
        /
      </div>
      <div class="flex md:justify-end justify-center">
        <Button onClick={clearFilters} text="Clear filters" />
      </div>
      <div class="w-full flex justify-center mt-16 mb-8 gap-16 flex-wrap">
        <LabeledValue value={summedResult().tests} label="Completed tests" />
        <LabeledValue value={summedResult().characters} label="Total characters" />
        <LabeledValue value={summedResult().words} label="Total words" />
        <LabeledValue
          value={getFormattedDuration(summedResult().duration)}
          label="Total duration"
        />
      </div>
      <div class="w-full flex justify-center mb-8 gap-16 flex-wrap">
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
      <Show
        when={!testResults.loading}
        fallback={<div class="chart-container p-4 paper">Loading...</div>}
      >
        <HistoryChart
          tests={getFilteredTestResults() ?? []}
          startDate={dates().startDate}
          endDate={dates().endDate}
        />
      </Show>
    </div>
  )
}
